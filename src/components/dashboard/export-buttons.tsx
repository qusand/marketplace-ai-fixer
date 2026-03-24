"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { CleanProduct } from "@/lib/types";

type Props = { products: CleanProduct[] };

const COLUMNS = [
  { key: "sku", header: "SKU", width: 18 },
  { key: "nazwa_org", header: "Nazwa oryginalna", width: 45 },
  { key: "kolor", header: "Kolor", width: 16 },
  { key: "wymiary_display", header: "Wymiary", width: 16 },
  { key: "szerokosc_cm", header: "Szerokość (cm)", width: 14 },
  { key: "dlugosc_cm", header: "Długość (cm)", width: 14 },
  { key: "cena_wartosc", header: "Cena", width: 10 },
  { key: "waluta", header: "Waluta", width: 8 },
  { key: "opis_czysty", header: "Opis (oczyszczony)", width: 60 },
  { key: "opis_format", header: "Format źródłowy", width: 14 },
  { key: "stan_wartosc", header: "Stan magazynowy", width: 14 },
  { key: "stan_status", header: "Status stanu", width: 14 },
  { key: "ean_raw", header: "EAN", width: 16 },
  { key: "ean_status", header: "Status EAN", width: 18 },
  { key: "tytul_allegro", header: "Tytuł Allegro", width: 55 },
  { key: "material", header: "Materiał", width: 20 },
] as const;

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ExportButtons({ products }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleXlsx() {
    setLoading(true);
    try {
      const ExcelJS = await import("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Oczyszczone dane");

      sheet.columns = COLUMNS.map((col) => ({ header: col.header, key: col.key, width: col.width }));

      const headerRow = sheet.getRow(1);
      headerRow.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
      headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E293B" } };
      headerRow.alignment = { vertical: "middle", horizontal: "center" };
      headerRow.height = 28;

      for (const p of products) {
        const row = sheet.addRow({
          ...p,
          kolor: p.kolor ?? "", wymiary_display: p.wymiary_display ?? "",
          szerokosc_cm: p.szerokosc_cm ?? "", dlugosc_cm: p.dlugosc_cm ?? "",
          cena_wartosc: p.cena_wartosc ?? "", waluta: p.waluta ?? "",
          stan_wartosc: p.stan_wartosc ?? "", ean_raw: p.ean_raw ?? "",
          material: p.material ?? "",
        });
        row.alignment = { vertical: "middle", wrapText: true };
      }

      const eanStatusCol = COLUMNS.findIndex(c => c.key === "ean_status") + 1;
      const stockStatusCol = COLUMNS.findIndex(c => c.key === "stan_status") + 1;

      sheet.eachRow((row, n) => {
        if (n === 1) return;
        const eanCell = row.getCell(eanStatusCol);
        if (["missing", "non_numeric", "checksum_invalid"].includes(String(eanCell.value))) {
          eanCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFEE2E2" } };
          eanCell.font = { color: { argb: "FFDC2626" } };
        }
        const stockCell = row.getCell(stockStatusCol);
        const sv = String(stockCell.value);
        if (sv === "non_exact") {
          stockCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFEF3C7" } };
          stockCell.font = { color: { argb: "FFD97706" } };
        } else if (sv === "empty") {
          stockCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFEE2E2" } };
          stockCell.font = { color: { argb: "FFDC2626" } };
        }
      });

      sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: products.length + 1, column: COLUMNS.length } };
      sheet.views = [{ state: "frozen", ySplit: 1 }];

      const buffer = await workbook.xlsx.writeBuffer();
      download(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), "produkty_oczyszczone.xlsx");
    } catch (err) {
      console.error("Export XLSX failed:", err);
    } finally {
      setLoading(false);
    }
  }

  function escapeCsvField(val: unknown): string {
    const str = val == null ? "" : String(val);
    // CSV injection protection — prefix dangerous leading characters
    let safe = str;
    if (/^[=+\-@\t\r]/.test(safe)) {
      safe = "'" + safe;
    }
    const sep = ";";
    return safe.includes(sep) || safe.includes('"') || safe.includes("\n")
      ? `"${safe.replace(/"/g, '""')}"` : safe;
  }

  function handleCsv() {
    const BOM = "\uFEFF";
    const sep = ";";
    const headers = COLUMNS.map(c => c.header).join(sep);
    const rows = products.map(p =>
      COLUMNS.map(col => escapeCsvField((p as Record<string, unknown>)[col.key])).join(sep)
    );
    download(new Blob([BOM + [headers, ...rows].join("\r\n")], { type: "text/csv;charset=utf-8" }), "produkty_oczyszczone.csv");
  }

  function handleJson() {
    const BOM = "\uFEFF";
    const json = JSON.stringify(products, null, 2);
    download(new Blob([BOM + json], { type: "application/json;charset=utf-8" }), "produkty_oczyszczone.json");
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Button variant="default" size="sm" onClick={handleXlsx} disabled={loading} className="h-7 sm:h-8 text-[11px] sm:text-xs px-2 sm:px-3">
        <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
        <span className="hidden sm:inline">{loading ? "Generowanie…" : "Pobierz Excel"}</span>
        <span className="sm:hidden">{loading ? "…" : "Excel"}</span>
      </Button>
      <Button variant="outline" size="sm" onClick={handleCsv} className="h-7 sm:h-8 text-[11px] sm:text-xs px-2 sm:px-3">
        <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
        CSV
      </Button>
      <Button variant="outline" size="sm" onClick={handleJson} className="h-7 sm:h-8 text-[11px] sm:text-xs px-2 sm:px-3">
        <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
        JSON
      </Button>
    </div>
  );
}
