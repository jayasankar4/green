import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

const EXCEL_FILE = path.join(process.cwd(), "data", "contact-submissions.xlsx");

function ensureDataDir() {
  const dir = path.dirname(EXCEL_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function appendToExcel(data: Record<string, string>) {
  ensureDataDir();

  const row = {
    "Date & Time": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    "Name": data.name || "",
    "Company": data.company || "",
    "Email": data.email || "",
    "Phone": data.phone || "",
    "Subject": data.subject || "",
    "Message": data.message || "",
  };

  let workbook: XLSX.WorkBook;
  let worksheet: XLSX.WorkSheet;

  if (fs.existsSync(EXCEL_FILE)) {
    // Read existing file and append
    const fileBuffer = fs.readFileSync(EXCEL_FILE);
    workbook = XLSX.read(fileBuffer, { type: "buffer" });
    worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Get existing data and add new row
    const existingData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet);
    existingData.push(row);

    // Recreate sheet with all data
    const newSheet = XLSX.utils.json_to_sheet(existingData);

    // Set column widths for readability
    newSheet["!cols"] = [
      { wch: 22 }, // Date & Time
      { wch: 25 }, // Name
      { wch: 25 }, // Company
      { wch: 30 }, // Email
      { wch: 18 }, // Phone
      { wch: 22 }, // Subject
      { wch: 50 }, // Message
    ];

    workbook.Sheets[workbook.SheetNames[0]] = newSheet;
  } else {
    // Create new workbook
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.json_to_sheet([row]);

    // Set column widths
    worksheet["!cols"] = [
      { wch: 22 }, // Date & Time
      { wch: 25 }, // Name
      { wch: 25 }, // Company
      { wch: 30 }, // Email
      { wch: 18 }, // Phone
      { wch: 22 }, // Subject
      { wch: 50 }, // Message
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Contact Submissions");
  }

  // Write file
  XLSX.writeFile(workbook, EXCEL_FILE);
}

async function sendNotificationEmail(data: Record<string, string>) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || user || "grassinfratech@gmail.com";

  if (!host || !user || !pass) {
    console.log("SMTP variables not set in .env.local. Email alert skipped, submission saved to Excel.");
    return false;
  }

  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const mailOptions = {
    from: `"Grass Infratech Website" <${user}>`,
    to: receiver,
    replyTo: data.email,
    subject: `[New Inquiry] ${data.subject || "Contact Form Submission"} - ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #0b3c3c; border-bottom: 2px solid #2ecc71; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
        <p style="color: #555;">You received a new inquiry from the website contact form:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 10px; font-weight: bold; background: #f8f9fa; width: 35%;">Full Name:</td>
            <td style="padding: 10px; background: #f8f9fa;">${data.name || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; width: 35%;">Email:</td>
            <td style="padding: 10px;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background: #f8f9fa;">Phone:</td>
            <td style="padding: 10px; background: #f8f9fa;">${data.phone || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Company:</td>
            <td style="padding: 10px;">${data.company || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background: #f8f9fa;">Subject / Requirement:</td>
            <td style="padding: 10px; background: #f8f9fa;">${data.subject || "N/A"}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 15px; background: #f4f6f8; border-left: 4px solid #2ecc71; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; color: #0b3c3c;">Message:</h4>
          <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.5;">${data.message || ""}</p>
        </div>

        <p style="font-size: 12px; color: #888; margin-top: 25px; border-top: 1px solid #eee; padding-top: 10px;">
          Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return true;
}

export async function GET() {
  try {
    if (!fs.existsSync(EXCEL_FILE)) {
      return NextResponse.json({ success: true, data: [] });
    }
    const fileBuffer = fs.readFileSync(EXCEL_FILE);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error reading contact submissions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load submissions." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format." },
        { status: 400 }
      );
    }

    // 1. Save to Excel file
    appendToExcel(body);

    // 2. Try sending email notification
    try {
      await sendNotificationEmail(body);
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // We don't fail the request if email sending fails, as Excel backup is saved
    }

    console.log("Contact form submission saved to Excel and processed:", body);

    return NextResponse.json({
      success: true,
      message: "Thank you for your inquiry. Our team will get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Error saving contact submission:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

