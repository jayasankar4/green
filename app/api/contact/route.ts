import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { appendToSheet } from "@/lib/googleSheets";

const DATA_DIR = path.join(process.cwd(), "data");
const JSON_FILE = path.join(DATA_DIR, "contact-submissions.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readSubmissions(): Record<string, string>[] {
  ensureDataDir();
  if (!fs.existsSync(JSON_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(JSON_FILE, "utf-8")) || []; } catch { return []; }
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
  worksheet["!cols"] = [{ wch: 22 }, { wch: 25 }, { wch: 25 }, { wch: 30 }, { wch: 18 }, { wch: 22 }, { wch: 60 }];
  XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Submissions");
  return Buffer.from(XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }));
}

async function sendNotificationEmail(data: Record<string, string>) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || user || "info@grassinfratech.com";
  if (!host || !user || !pass) { console.log("SMTP not set. Email skipped."); return false; }

  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });

  const allSubmissions = readSubmissions();
  const excelBuffer = generateExcelBuffer(allSubmissions);
  const today = new Date().toISOString().slice(0, 10);

  await transporter.sendMail({
    from: `"Grass Infratech Website" <${user}>`,
    to: receiver,
    replyTo: data.email,
    subject: `[Client Enquiry] ${data.subject || "New Message"} — ${data.name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
        <div style="background:#0b3c3c;padding:20px 24px;">
          <h2 style="color:#fff;margin:0;font-size:18px;">📋 New Contact Form Submission</h2>
          <p style="color:#a3d9a5;margin:4px 0 0;font-size:13px;">Grass Infratech Website</p>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;">
            ${[["Full Name", data.name],["Email", data.email],["Phone", data.phone],["Company", data.company],["Subject", data.subject]]
              .map(([l,v],i)=>`<tr style="background:${i%2===0?"#f4f6f8":"#fff"};"><td style="padding:10px 14px;font-weight:bold;color:#333;width:35%;border-bottom:1px solid #eee;">${l}</td><td style="padding:10px 14px;color:#555;border-bottom:1px solid #eee;">${l==="Email"?`<a href="mailto:${v}" style="color:#2ecc71;">${v||"N/A"}</a>`:v||"N/A"}</td></tr>`).join("")}
          </table>
          <div style="margin-top:20px;padding:16px;background:#f0f9f4;border-left:4px solid #2ecc71;border-radius:4px;">
            <h4 style="margin:0 0 8px;color:#0b3c3c;font-size:14px;">Message:</h4>
            <p style="margin:0;white-space:pre-wrap;color:#333;line-height:1.6;font-size:14px;">${data.message || ""}</p>
          </div>
          <p style="margin-top:16px;font-size:12px;color:#888;">📊 All submissions are also saved in your <strong>Google Sheet</strong>.<br/>Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
        </div>
      </div>`,
    attachments: [{ filename: `contact-submissions-${today}.xlsx`, content: excelBuffer, contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }],
  });
  return true;
}

export async function GET() {
  try {
    const submissions = readSubmissions();
    const excelBuffer = generateExcelBuffer(submissions);
    const today = new Date().toISOString().slice(0, 10);
    return new NextResponse(new Uint8Array(excelBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="grass-infratech-submissions-${today}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Excel download error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate file." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: Record<string, string> = {};
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ success: false, error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email format." }, { status: 400 });
  }

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // 1. Save to local JSON
  try { saveSubmission(body); } catch (err) { console.error("JSON save failed:", err); }

  // 2. Save to Google Sheets
  try {
    await appendToSheet(
      "Contact Submissions",
      ["Date & Time", "Name", "Company", "Email", "Phone", "Subject", "Message"],
      [timestamp, body.name || "", body.company || "", body.email || "", body.phone || "", body.subject || "", body.message || ""]
    );
    console.log("✅ Saved to Google Sheets");
  } catch (err) { console.error("❌ Google Sheets save failed:", err); }

  // 3. Send email
  try { await sendNotificationEmail(body); } catch (err) { console.error("❌ Email failed:", err); }

  return NextResponse.json({ success: true, message: "Thank you for your inquiry. Our team will get back to you within 24 hours." });
}
