import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import type { CleanProduct } from "@/lib/types";

const COLUMNS = [
  { header: "SKU", key: "sku", width: 18 },
  { header: "Nazwa oryginalna", key: "nazwa_org", width: 45 },
  { header: "Kolor", key: "kolor", width: 14 },
  { header: "Wymiary", key: "wymiary_display", width: 14 },
  { header: "Szerokość (cm)", key: "szerokosc_cm", width: 14 },
  { header: "Długość (cm)", key: "dlugosc_cm", width: 14 },
  { header: "Cena", key: "cena_wartosc", width: 10 },
  { header: "Waluta", key: "waluta", width: 8 },
  { header: "Opis oczyszczony", key: "opis_czysty", width: 60 },
  { header: "Format opisu", key: "opis_format", width: 14 },
  { header: "Stan (wartość)", key: "stan_wartosc", width: 14 },
  { header: "Stan (status)", key: "stan_status", width: 14 },
  { header: "EAN (surowy)", key: "ean_raw", width: 18 },
  { header: "EAN (status)", key: "ean_status", width: 18 },
  { header: "Tytuł Allegro", key: "tytul_allegro", width: 50 },
];

const ERROR_STATUSES = ["missing", "non_numeric", "checksum_invalid", "non_exact"];

export async function POST(request: NextRequest) {
  let products: CleanProduct[];
  try {
    const body = await request.json();
    if (!Array.isArray(body) || body.length === 0 || body.length > 500) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    products = body as CleanProduct[];
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Marketplace AI-Fixer";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("Produkty", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  // Set columns
  worksheet.columns = COLUMNS;

  // Style header row
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, size: 11 };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFF2F2F2" },
  };
  headerRow.alignment = { vertical: "middle" };
  headerRow.height = 24;

  // Enable auto-filter on all columns
  worksheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: COLUMNS.length },
  };

  // Add data rows
  for (const product of products) {
    const row = worksheet.addRow({
      sku: product.sku,
      nazwa_org: product.nazwa_org,
      kolor: product.kolor ?? "",
      wymiary_display: product.wymiary_display ?? "",
      szerokosc_cm: product.szerokosc_cm,
      dlugosc_cm: product.dlugosc_cm,
      cena_wartosc: product.cena_wartosc ?? "",
      waluta: product.waluta ?? "",
      opis_czysty: product.opis_czysty,
      opis_format: product.opis_format,
      stan_wartosc: product.stan_wartosc,
      stan_status: product.stan_status,
      ean_raw: product.ean_raw ?? "",
      ean_status: product.ean_status,
      tytul_allegro: product.tytul_allegro,
    });

    // Conditional formatting: red background on error cells
    const stanStatusCell = row.getCell("stan_status");
    if (ERROR_STATUSES.includes(product.stan_status)) {
      stanStatusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFEE2E2" },
      };
      stanStatusCell.font = { color: { argb: "FFDC2626" } };
    }

    const eanStatusCell = row.getCell("ean_status");
    if (ERROR_STATUSES.includes(product.ean_status)) {
      eanStatusCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFEE2E2" },
      };
      eanStatusCell.font = { color: { argb: "FFDC2626" } };
    }

    // Also highlight missing EAN raw value
    if (!product.ean_raw) {
      const eanRawCell = row.getCell("ean_raw");
      eanRawCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFEE2E2" },
      };
    }
  }

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="marketplace_ai_fixer_export.xlsx"',
    },
  });
}
