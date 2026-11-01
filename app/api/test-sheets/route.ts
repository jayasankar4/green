import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googleSheets";

export async function GET() {
  const results: Record<string, string> = {
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID ? "✅ Set" : "❌ Missing",
    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? "✅ Set" : "❌ Missing",
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY ? `✅ Set (starts with: ${process.env.GOOGLE_PRIVATE_KEY.substring(0, 30)}...)` : "❌ Missing",
  };

  try {
    await appendToSheet(
      "Test",
      ["Date", "Status"],
      [new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }), "✅ Google Sheets is working!"]
    );
    results.sheets_write = "✅ Successfully wrote to Google Sheets!";
  } catch (err: unknown) {
    results.sheets_write = `❌ Error: ${err instanceof Error ? err.message : String(err)}`;
  }

  return NextResponse.json(results, { status: 200 });
}
