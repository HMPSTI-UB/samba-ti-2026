// @ts-ignore
import ExcelJS from "exceljs";
import type { MabaExportItem } from "@/features/maba/api/maba";

const HEADER_FILL: ExcelJS.Fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FF1E3A8A" },
};

const THIN_BORDER: ExcelJS.Border = {
  style: "thin",
  color: { argb: "FF9CA3AF" },
};

const ALL_BORDERS: Partial<ExcelJS.Borders> = {
  top: THIN_BORDER,
  left: THIN_BORDER,
  bottom: THIN_BORDER,
  right: THIN_BORDER,
};

const ALL_SHEET_COLUMNS = [
  { width: 6 },
  { width: 32 },
  { width: 18 },
  { width: 10 },
  { width: 34 },
  { width: 22 },
  { width: 22 },
  { width: 12 },
];

const CREDENTIAL_SHEET_COLUMNS = [
  { width: 6 },
  { width: 24 },
  { width: 18 },
  { width: 34 },
  { width: 18 },
];

function sanitizeSheetName(name: string): string {
  const cleaned = name.replace(/[\\/?*[\]:]/g, " ").replace(/\s+/g, " ").trim();
  return cleaned.slice(0, 31) || "Cluster";
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function dateStamp(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function styleTitleCell(cell: ExcelJS.Cell, value: string) {
  cell.value = value;
  cell.font = { bold: true, size: 14 };
  cell.alignment = { horizontal: "center", vertical: "middle" };
}

function styleSubtitleCell(cell: ExcelJS.Cell, value: string) {
  cell.value = value;
  cell.font = { italic: true, size: 10 };
  cell.alignment = { horizontal: "center", vertical: "middle" };
}

function styleHeaderRow(row: ExcelJS.Row) {
  row.height = 20;
  row.eachCell((cell: any) => {
    cell.fill = HEADER_FILL;
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = ALL_BORDERS;
  });
}

function styleDataRow(row: ExcelJS.Row) {
  row.eachCell((cell: any) => {
    cell.border = ALL_BORDERS;
  });
}

function triggerDownload(buffer: ArrayBuffer, filename: string) {
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadText(text: string, filename: string, mime = "text/csv;charset=utf-8;bom") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function buildMabaSeedCsv(items: MabaExportItem[]): void {
  const BOM = "\uFEFF";
  const header = "Nama,Username,Email,NIM,Gender,Status,Cluster";
  const csvEscape = (v: string | null | undefined) => {
    const s = v ?? "";
    return `"${s.replace(/"/g, '""')}"`;
  };
  const rows = items.map((item) =>
    [
      item.name,
      item.username ?? "",
      item.email,
      item.nim ?? "",
      item.gender ?? "",
      item.status ? "Aktif" : "Nonaktif",
      item.clusterName ?? "",
    ]
      .map(csvEscape)
      .join(","),
  );

  downloadText(BOM + header + "\n" + rows.join("\n"), `maba-seed-${dateStamp(new Date())}.csv`);
}

export async function buildMabaWorkbook(items: MabaExportItem[]): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Samba TI 2026";

  const dateLabel = formatDate(new Date());
  const stamp = dateStamp(new Date());

  const allSheet = workbook.addWorksheet("Semua MABA");
  allSheet.mergeCells("A1:H1");
  styleTitleCell(allSheet.getCell("A1"), "DAFTAR MABA SAMBA TI 2026");
  allSheet.getRow(1).height = 24;

  allSheet.mergeCells("A2:H2");
  styleSubtitleCell(allSheet.getCell("A2"), `Tanggal export: ${dateLabel}`);

  const allHeader = allSheet.addRow(["No", "Nama", "NIM", "Gender", "Email", "Username", "Cluster", "Status"]);
  styleHeaderRow(allHeader);

  items.forEach((item, i) => {
    const row = allSheet.addRow([
      i + 1,
      item.name,
      item.nim ?? "",
      item.gender ?? "",
      item.email,
      item.username ?? "",
      item.clusterName ?? "",
      item.status ? "Aktif" : "Nonaktif",
    ]);
    styleDataRow(row);
    row.getCell(3).numFmt = "@";
    row.getCell(6).numFmt = "@";
  });

  allSheet.columns = ALL_SHEET_COLUMNS;
  allSheet.views = [{ state: "frozen", ySplit: 3 }];
  allSheet.autoFilter = { from: "A3", to: `H${allSheet.rowCount}` };

  const byCluster = new Map<string, MabaExportItem[]>();
  for (const item of items) {
    const key = item.clusterName ?? "Tanpa Cluster";
    if (!byCluster.has(key)) byCluster.set(key, []);
    byCluster.get(key)!.push(item);
  }

  for (const [clusterName, members] of byCluster) {
    const sheet = workbook.addWorksheet(sanitizeSheetName(clusterName));
    sheet.mergeCells("A1:E1");
    styleTitleCell(sheet.getCell("A1"), `KREDENSIAL LOGIN MABA — ${clusterName.toUpperCase()}`);
    sheet.getRow(1).height = 24;

    sheet.mergeCells("A2:E2");
    styleSubtitleCell(sheet.getCell("A2"), `Tanggal export: ${dateLabel}`);

    const header = sheet.addRow(["No", "Username", "NIM", "Email", "Password"]);
    styleHeaderRow(header);

    members.forEach((item, i) => {
      const row = sheet.addRow([i + 1, item.username ?? "", item.nim ?? "", item.email, item.nim ?? ""]);
      styleDataRow(row);
      row.getCell(3).numFmt = "@";
      row.getCell(5).numFmt = "@";
    });

    sheet.columns = CREDENTIAL_SHEET_COLUMNS;
    sheet.views = [{ state: "frozen", ySplit: 3 }];
    sheet.autoFilter = { from: "A3", to: `E${sheet.rowCount}` };
  }

  const buffer = await (workbook.xlsx as any).writeBuffer();
  triggerDownload(buffer as ArrayBuffer, `Daftar-MABA-${stamp}.xlsx`);
}
