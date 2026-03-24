import { NextRequest, NextResponse } from "next/server";
import type { CleanProduct } from "@/lib/types";

const COLUMNS = [
  "sku",
  "nazwa_org",
  "kolor",
  "wymiary_display",
  "szerokosc_cm",
  "dlugosc_cm",
  "cena_wartosc",
  "waluta",
  "opis_czysty",
  "opis_format",
  "stan_wartosc",
  "stan_status",
  "ean_raw",
  "ean_status",
  "tytul_allegro",
] as const;

const HEADERS = [
  "SKU",
  "Nazwa oryginalna",
  "Kolor",
  "Wymiary",
  "Szerokość (cm)",
  "Długość (cm)",
  "Cena",
  "Waluta",
  "Opis oczyszczony",
  "Format opisu",
  "Stan (wartość)",
  "Stan (status)",
  "EAN (surowy)",
  "EAN (status)",
  "Tytuł Allegro",
];

function escapeCsvField(value: string | number | null | undefined): string {
  const str = value === null || value === undefined ? "" : String(value);
  // Prevent CSV formula injection — prefix dangerous leading characters
  let safe = str;
  if (/^[=+\-@\t\r]/.test(safe)) {
    safe = "'" + safe;
  }
  // Escape if contains separator, quotes, or newlines
  if (safe.includes(";") || safe.includes('"') || safe.includes("\n") || safe.includes("\r")) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

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

  // UTF-8 BOM for Excel compatibility with Polish characters
  const BOM = "\uFEFF";

  const lines: string[] = [];

  // Header row
  lines.push(HEADERS.map(escapeCsvField).join(";"));

  // Data rows
  for (const product of products) {
    const row = COLUMNS.map((col) => {
      const value = product[col];
      return escapeCsvField(value);
    });
    lines.push(row.join(";"));
  }

  const csv = BOM + lines.join("\r\n") + "\r\n";

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="marketplace_ai_fixer_export.csv"',
    },
  });
}
