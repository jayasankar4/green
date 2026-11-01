import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

// Store submissions as JSON — reliable across all environments
const DATA_DIR = path.join(process.cwd(), "data");
const JSON_FILE = path.join(DATA_DIR, "contact-submissions.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readSubmissions(): Record<string, string>[] {
  ensureDataDir();
  if (!fs.existsSync(JSON_FILE)) return [];
  try {
    const raw = fs.readFileSync(JSON_FILE, "utf-8");
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

function saveSubmission(data: Record<string, string>) {
  ensureDataDir();
  const submissions = readSubmissions();
  submissions.push({
    "Date & Time": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    "Name": data.name || "",
    "Company": data.company || "",
    "Email": data.email || "",
    "Phone": data.phone || "",
    "Subject": data.subject || "",
    "Message": data.message || "",
  });
  fs.writeFileSync(JSON_FILE, JSON.stringify(submissions, null, 2), "utf-8");
}

function generateExcelBuffer(submissions: Record<string, string>[]): Buffer {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(
    submissions.length > 0
      ? submissions
      : [{ "Date & Time": "", Name: "", Company: "", Email: "", Phone: "", Subject: "", Message: "" }]
  );
  worksheet["!cols"] = [
    { wch: 22 }, // Date & Time
    { wch: 25 }, // Name
    { wch: 25 }, // Company
    { wch: 30 }, // Email
    { wch: 18 }, // Phone
    { wch: 22 }, // Subject
    { wch: 60 }, // Message
  ];
  XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Submissions");
  return Buffer.from(XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }));
}

async function sendNotificationEmail(data: Record<string, string>) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || user || "info@grassinfratech.com";

  if (!host || !user || !pass) {
    console.log("SMTP variables not set. Email skipped.");
    return false;
  }

  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });

  // Generate Excel attachment with ALL submissions so far
  const allSubmissions = readSubmissions();
  const excelBuffer = generateExcelBuffer(allSubmissions);
  const today = new Date().toISOString().slice(0, 10);

  const mailOptions = {
    from: `"Grass Infratech Website" <${user}>`,
    to: receiver,
    replyTo: data.email,
    subject: `[Client Enquiry] ${data.subject || "New Message"} — ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: #0b3c3c; padding: 20px 24px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 18px;">📋 New Contact Form Submission</h2>
          <p style="color: #a3d9a5; margin: 4px 0 0; font-size: 13px;">Grass Infratech LLP Website</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f4f6f8;">
              <td style="padding: 10px 14px; font-weight: bold; color: #333; width: 35%; border-bottom: 1px solid #eee;">Full Name</td>
              <td style="padding: 10px 14px; color: #555; border-bottom: 1px solid #eee;">${data.name || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; color: #333; border-bottom: 1px solid #eee;">Email</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #2ecc71;">${data.email || "N/A"}</a></td>
            </tr>
            <tr style="background: #f4f6f8;">
              <td style="padding: 10px 14px; font-weight: bold; color: #333; border-bottom: 1px solid #eee;">Phone</td>
              <td style="padding: 10px 14px; color: #555; border-bottom: 1px solid #eee;">${data.phone || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; color: #333; border-bottom: 1px solid #eee;">Company</td>
              <td style="padding: 10px 14px; color: #555; border-bottom: 1px solid #eee;">${data.company || "N/A"}</td>
            </tr>
            <tr style="background: #f4f6f8;">
              <td style="padding: 10px 14px; font-weight: bold; color: #333; border-bottom: 1px solid #eee;">Subject</td>
              <td style="padding: 10px 14px; color: #555; border-bottom: 1px solid #eee;">${data.subject || "N/A"}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 16px; background: #f0f9f4; border-left: 4px solid #2ecc71; border-radius: 4px;">
            <h4 style="margin: 0 0 8px; color: #0b3c3c; font-size: 14px;">Message:</h4>
            <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.6; font-size: 14px;">${data.message || ""}</p>
          </div>

          <p style="margin-top: 20px; font-size: 12px; color: #888;">
            📎 <strong>All submissions Excel sheet is attached</strong> to this email (${allSubmissions.length} total submission${allSubmissions.length !== 1 ? "s" : ""}).<br/>
            Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `grass-infratech-submissions-${today}.xlsx`,
        content: excelBuffer,
        contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  return true;
}

export async function GET() {
  try {
    const submissions = readSubmissions();
    const excelBuffer = generateExcelBuffer(submissions);
    const today = new Date().toISOString().slice(0, 10);

    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="grass-infratech-submissions-${today}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error generating Excel download:", error);
    return NextResponse.json({ success: false, error: "Failed to generate file." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: Record<string, string> = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email format." }, { status: 400 });
  }

  // 1. Save to JSON (always works)
  try {
    saveSubmission(body);
    console.log("✅ Submission saved to JSON.");
  } catch (err) {
    console.error("❌ JSON save failed:", err);
  }

  // 2. Send email with Excel attached
  try {
    await sendNotificationEmail(body);
    console.log("✅ Notification email sent with Excel attachment.");
  } catch (emailError) {
    console.error("❌ Email send failed:", emailError);
  }

  return NextResponse.json({
    success: true,
    message: "Thank you for your inquiry. Our team will get back to you within 24 hours.",
  });
}
