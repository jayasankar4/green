import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;

function getAuth() {
  // Decode the base64 credentials — most reliable approach for Vercel
  const base64 = process.env.GOOGLE_CREDENTIALS_BASE64;
  if (base64) {
    const credentials = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
    return new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  // Fallback: use individual env vars
  const client_email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const private_key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")!;
  return new google.auth.GoogleAuth({
    credentials: { client_email, private_key },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendToSheet(
  sheetName: string,
  headers: string[],
  rowValues: string[]
) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // Check if the tab exists; create it if not
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const existingSheets = meta.data.sheets?.map((s) => s.properties?.title) || [];

  if (!existingSheets.includes(sheetName)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: sheetName } } }],
      },
    });
    // Write header row
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    });
  }

  // Append the data row
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: "RAW",
    requestBody: { values: [rowValues] },
  });
}
