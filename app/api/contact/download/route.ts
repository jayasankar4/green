import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const EXCEL_FILE = path.join(process.cwd(), "data", "contact-submissions.xlsx");

export async function GET() {
  try {
    if (!fs.existsSync(EXCEL_FILE)) {
      return NextResponse.json(
        { success: false, error: "No submissions yet." },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(EXCEL_FILE);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="grass-infratech-submissions-${new Date().toISOString().slice(0, 10)}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error downloading Excel file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to download file." },
      { status: 500 }
    );
  }
}
