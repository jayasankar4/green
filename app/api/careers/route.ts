import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function sendCareerEmail(data: Record<string, string>, cvBuffer?: Buffer, cvFilename?: string) {
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

  const rows = [
    ["Full Name",       data.name        || "N/A"],
    ["Email",           data.email       || "N/A"],
    ["Phone",           data.phone       || "N/A"],
    ["Qualification",   data.qualification || "N/A"],
    ["Skills",          data.skills      || "N/A"],
    ["Experience",      data.experience  || "N/A"],
    ["Message",         data.message     || "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? "#f4f6f8" : "#ffffff"};">
        <td style="padding:10px 14px;font-weight:bold;color:#333;width:35%;border-bottom:1px solid #eee;">${label}</td>
        <td style="padding:10px 14px;color:#555;border-bottom:1px solid #eee;">${label === "Email"
          ? `<a href="mailto:${value}" style="color:#2ecc71;">${value}</a>`
          : value
        }</td>
      </tr>`
    )
    .join("");

  const attachments: nodemailer.Attachment[] = [];
  if (cvBuffer && cvFilename) {
    attachments.push({
      filename: cvFilename,
      content: cvBuffer,
    });
  }

  await transporter.sendMail({
    from: `"Grass Infratech Website" <${user}>`,
    to: receiver,
    replyTo: data.email,
    subject: `[Hiring] New Application — ${data.name} | ${data.skills || data.experience || "Engineer"}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
        <div style="background:#0b3c3c;padding:20px 24px;">
          <h2 style="color:#ffffff;margin:0;font-size:18px;">👤 New Career Application</h2>
          <p style="color:#a3d9a5;margin:4px 0 0;font-size:13px;">Grass Infratech Website — Careers Form</p>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;">
            ${tableRows}
          </table>
          ${cvFilename
            ? `<p style="margin-top:20px;font-size:13px;color:#555;">📎 <strong>CV / Resume attached:</strong> ${cvFilename}</p>`
            : `<p style="margin-top:20px;font-size:13px;color:#e74c3c;">⚠️ No CV attached.</p>`
          }
          <p style="margin-top:8px;font-size:12px;color:#888;">
            Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </p>
        </div>
      </div>
    `,
    attachments,
  });

  return true;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let data: Record<string, string> = {};
    let cvBuffer: Buffer | undefined;
    let cvFilename: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      // Extract all text fields
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          data[key] = value;
        } else {
          // It's a File
          const file = value as File;
          if (file.size > 0) {
            const arrayBuffer = await file.arrayBuffer();
            cvBuffer = Buffer.from(arrayBuffer);
            cvFilename = file.name;
          }
        }
      }
    } else {
      // JSON fallback
      data = await request.json();
    }

    // Basic validation
    if (!data.name || !data.email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Send email
    try {
      await sendCareerEmail(data, cvBuffer, cvFilename);
      console.log("✅ Career application email sent.");
    } catch (emailError) {
      console.error("❌ Career email failed:", emailError);
      // Don't block the user — still return success
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("Career form error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

