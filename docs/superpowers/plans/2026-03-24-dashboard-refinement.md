# Dashboard Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Marketplace AI-Fixer dashboard with dual theme, indigo accents, drag & drop JSON, Allegro preview mockup, and change history — turning it from a functional prototype into a professional, recruiter-ready tool.

**Architecture:** Existing Next.js 16 + shadcn/ui app. Add `next-themes` for dark mode. Refactor Dashboard to use `useState` for products (enabling drag & drop). New components: Header, ThemeToggle, AllegroPreview, ChangeHistory. Export moves client-side for state compatibility.

**Tech Stack:** Next.js 16, Tailwind CSS v4, shadcn/ui, next-themes, exceljs (dynamic import), lucide-react

**Spec:** `docs/superpowers/specs/2026-03-24-dashboard-refinement-design.md`

---

### Task 1: Install next-themes and set up ThemeProvider

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/dashboard/theme-provider.tsx`

- [ ] **Step 1: Install next-themes**

Run: `cd C:/Users/erykt/OneDrive/Pulpit/ZADANIE/marketplace-ai-fixer && npm install next-themes`

- [ ] **Step 2: Create ThemeProvider wrapper**

Create `src/components/dashboard/theme-provider.tsx`:

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 3: Wrap layout with ThemeProvider**

In `src/app/layout.tsx`, import `ThemeProvider` and wrap `{children}` inside `<body>`:

```tsx
import { ThemeProvider } from "@/components/dashboard/theme-provider";

// inside return:
<body className="min-h-full flex flex-col">
  <ThemeProvider>{children}</ThemeProvider>
</body>
```

Also add `suppressHydrationWarning` to `<html>` (required by next-themes to prevent FOUC warning).

- [ ] **Step 4: Verify build compiles**

Run: `npx next build 2>&1 | tail -10`
Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add src/components/dashboard/theme-provider.tsx src/app/layout.tsx package.json package-lock.json
git commit -m "feat: add next-themes for dual theme support"
```

---

### Task 2: Update CSS variables with indigo accent

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace primary/ring/accent variables in :root (light mode)**

In `globals.css`, change these lines in `:root`:

```css
--primary: oklch(0.585 0.233 264);
--primary-foreground: oklch(0.985 0 0);
--ring: oklch(0.585 0.233 264);
--accent: oklch(0.962 0.018 264);
--accent-foreground: oklch(0.337 0.166 264);
```

- [ ] **Step 2: Replace primary/ring/accent variables in .dark**

In `globals.css`, change these lines in `.dark`:

```css
--primary: oklch(0.673 0.233 264);
--primary-foreground: oklch(0.205 0 0);
--ring: oklch(0.673 0.233 264);
--accent: oklch(0.257 0.09 264);
--accent-foreground: oklch(0.87 0.065 264);
```

- [ ] **Step 3: Verify build compiles**

Run: `npx next build 2>&1 | tail -10`
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: update CSS variables with indigo accent colors"
```

---

### Task 3: Create ThemeToggle component

**Files:**
- Create: `src/components/dashboard/theme-toggle.tsx`

- [ ] **Step 1: Create theme toggle with sun/moon icons**

Create `src/components/dashboard/theme-toggle.tsx`:

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative h-8 w-8 p-0"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className={`h-4 w-4 transition-transform duration-300 ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"} absolute`} />
      <Moon className={`h-4 w-4 transition-transform duration-300 ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
      <span className="sr-only">Zmień motyw</span>
    </Button>
  );
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npx next build 2>&1 | tail -10`

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/theme-toggle.tsx
git commit -m "feat: add ThemeToggle component with sun/moon animation"
```

---

### Task 4: State refactor — products as useState

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/dashboard/dashboard.tsx`

- [ ] **Step 1: Update page.tsx to pass initial props**

Change `src/app/page.tsx` to pass `initialProducts` and `initialRawProducts`:

```tsx
import { processProducts } from "@/lib/data-processor";
import type { RawProduct } from "@/lib/types";
import rawData from "@/data/partner_export_dirty.json";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function Home() {
  const rawProducts = rawData as RawProduct[];
  const cleanProducts = processProducts(rawProducts);

  return <Dashboard initialProducts={cleanProducts} initialRawProducts={rawProducts} />;
}
```

- [ ] **Step 2: Update dashboard.tsx to use useState**

Change Props type and add useState in `src/components/dashboard/dashboard.tsx`:

```tsx
import { useState } from "react";

type Props = {
  initialProducts: CleanProduct[];
  initialRawProducts: RawProduct[];
};

export function Dashboard({ initialProducts, initialRawProducts }: Props) {
  const [products, setProducts] = useState<CleanProduct[]>(initialProducts);
  const [rawProducts, setRawProducts] = useState<RawProduct[]>(initialRawProducts);
  // ... rest uses products/rawProducts from state
```

- [ ] **Step 3: Verify build compiles**

Run: `npx next build 2>&1 | tail -10`

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/components/dashboard/dashboard.tsx
git commit -m "refactor: products as useState for dynamic data support"
```

---

### Task 6: Extract Header component with drop zone

**Files:**
- Create: `src/components/dashboard/header.tsx`
- Modify: `src/components/dashboard/dashboard.tsx`

- [ ] **Step 1: Create header.tsx with drop zone logic**

Create `src/components/dashboard/header.tsx`:

```tsx
"use client";

import { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { ExportButtons } from "./export-buttons";
import { processProducts } from "@/lib/data-processor";
import type { RawProduct, CleanProduct } from "@/lib/types";

type Props = {
  products: CleanProduct[];
  onDataUpdate: (raw: RawProduct[], clean: CleanProduct[]) => void;
};

export function Header({ products, onDataUpdate }: Props) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (!file || !file.name.endsWith(".json")) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("Plik musi zawierać niepustą tablicę produktów");
      }
      const requiredFields = ["NAZWA ORG", "SKU", "Cena", "Opis ofe", "Stany", "EAN"];
      const missingFields = requiredFields.filter(f => !(f in parsed[0]));
      if (missingFields.length > 0) {
        throw new Error(`Brakujące pola: ${missingFields.join(", ")}`);
      }
      const cleaned = processProducts(parsed as RawProduct[]);
      onDataUpdate(parsed as RawProduct[], cleaned);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nieprawidłowy format JSON");
      setTimeout(() => setError(null), 4000);
    }
  }, [onDataUpdate]);

  return (
    <header
      className={`border-b transition-colors duration-150 ${
        isDragOver
          ? "border-2 border-dashed border-primary bg-primary/5"
          : "border-border/50"
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Marketplace AI-Fixer
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Czyszczenie i normalizacja danych produktowych
            </p>
          </div>

          {isDragOver ? (
            <div className="flex items-center gap-2 text-primary">
              <Upload className="h-5 w-5" />
              <span className="text-sm font-medium">Upuść plik JSON</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground/40">
              <Upload className="h-3.5 w-3.5" />
              <span className="text-[11px] hidden sm:inline">lub przeciągnij plik JSON</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ExportButtons products={products} />
          </div>
        </div>

        {error && (
          <div className="mt-2 text-xs text-destructive bg-destructive/10 rounded-md px-3 py-1.5">
            {error}
          </div>
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Update dashboard.tsx to use Header**

Replace the inline header in `dashboard.tsx` with:

```tsx
import { Header } from "./header";

// Inside Dashboard function, add handler:
const handleDataUpdate = useCallback((raw: RawProduct[], clean: CleanProduct[]) => {
  setRawProducts(raw);
  setProducts(clean);
}, []);

// Replace <header>...</header> with:
<Header products={products} onDataUpdate={handleDataUpdate} />
```

Import `useCallback` from react.

- [ ] **Step 3: Verify build compiles**

Run: `npx next build 2>&1 | tail -10`

- [ ] **Step 4: Commit**

```bash
git add src/components/dashboard/header.tsx src/components/dashboard/dashboard.tsx
git commit -m "feat: extract Header component with drag & drop zone"
```

---

### Task 5: Refactor ExportButtons to client-side with products prop

**Files:**
- Modify: `src/components/dashboard/export-buttons.tsx`

- [ ] **Step 1: Rewrite ExportButtons to accept products and export client-side**

Rewrite `src/components/dashboard/export-buttons.tsx`:

```tsx
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
    } finally {
      setLoading(false);
    }
  }

  function handleCsv() {
    const BOM = "\uFEFF";
    const sep = ";";
    const headers = COLUMNS.map(c => c.header).join(sep);
    const rows = products.map(p =>
      COLUMNS.map(col => {
        const val = p[col.key as keyof CleanProduct];
        const str = val == null ? "" : String(val);
        return str.includes(sep) || str.includes('"') || str.includes("\n")
          ? `"${str.replace(/"/g, '""')}"` : str;
      }).join(sep)
    );
    download(new Blob([BOM + [headers, ...rows].join("\r\n")], { type: "text/csv;charset=utf-8" }), "produkty_oczyszczone.csv");
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="default" size="sm" onClick={handleXlsx} disabled={loading} className="h-8 text-xs">
        <Download className="w-3.5 h-3.5 mr-1.5" />
        {loading ? "Generowanie…" : "Pobierz Excel"}
      </Button>
      <Button variant="outline" size="sm" onClick={handleCsv} className="h-8 text-xs">
        <Download className="w-3.5 h-3.5 mr-1.5" />
        Pobierz CSV
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Verify build compiles**

Run: `npx next build 2>&1 | tail -10`

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/export-buttons.tsx
git commit -m "refactor: client-side export with products prop for drag-and-drop compat"
```

---

### Task 7: Add extractMaterial and material field to data processor

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/lib/data-processor.ts`

- [ ] **Step 1: Add material field to CleanProduct type**

In `src/lib/types.ts`, add `material: string | null;` after `tytul_allegro`:

```typescript
export type CleanProduct = {
  // ... existing fields ...
  tytul_allegro: string;
  material: string | null;
};
```

- [ ] **Step 2: Add extractMaterial function to data-processor.ts**

Add before `processProducts()`:

```typescript
function extractMaterial(description: string): string | null {
  const patterns = [
    /100%\s+(poliester|bawełna|PES|nylon|akryl|wiskoza)/i,
    /materiał[:\s]+([\w%\s]+?)(?:\.|,|$)/i,
    /skład[:\s]+([\w%\s]+?)(?:\.|,|$)/i,
  ];
  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match) return match[1].trim();
  }
  return null;
}
```

- [ ] **Step 3: Call extractMaterial in processProducts and include in return**

In `processProducts`, add after `desc`:

```typescript
const material = extractMaterial(desc.opis_czysty);
```

Add `material` to the return object.

- [ ] **Step 4: Verify build compiles**

Run: `npx next build 2>&1 | tail -10`

- [ ] **Step 5: Commit**

```bash
git add src/lib/types.ts src/lib/data-processor.ts
git commit -m "feat: extract material from descriptions for Allegro preview"
```

---

### Task 8: Create Allegro preview component

**Files:**
- Create: `src/components/dashboard/allegro-preview.tsx`
- Modify: `src/components/dashboard/product-detail-sheet.tsx`

- [ ] **Step 1: Create allegro-preview.tsx**

Create `src/components/dashboard/allegro-preview.tsx`:

```tsx
"use client";

import { Package } from "lucide-react";
import { EanBadge } from "./ean-badge";
import type { CleanProduct } from "@/lib/types";

export function AllegroPreview({ product }: { product: CleanProduct }) {
  return (
    <div className="bg-white text-slate-900 rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Image placeholder */}
      <div className="bg-slate-100 h-48 flex items-center justify-center border-b border-slate-200">
        <Package className="h-12 w-12 text-slate-300" />
      </div>

      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-[15px] font-semibold leading-snug text-slate-900">
          {product.tytul_allegro}
        </h3>
        <p className="text-[10px] text-slate-400">
          {product.tytul_allegro.length}/75 znaków
        </p>

        {/* Price + stock */}
        <div className="flex items-baseline justify-between">
          <span className="text-xl font-bold text-slate-900">
            {product.cena_wartosc ? `${product.cena_wartosc} zł` : "—"}
          </span>
          <span className="text-xs text-slate-500">
            {product.stan_status === "exact"
              ? product.stan_wartosc === 0
                ? "Brak w magazynie"
                : `Dostępne: ${product.stan_wartosc} szt.`
              : "Stan nieznany"}
          </span>
        </div>

        {/* Separator */}
        <hr className="border-slate-200" />

        {/* Parameters */}
        <div>
          <h4 className="text-xs font-semibold text-slate-700 mb-2">Parametry</h4>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
            {product.kolor && (
              <>
                <dt className="text-slate-500">Kolor</dt>
                <dd className="text-slate-900 capitalize">{product.kolor}</dd>
              </>
            )}
            {product.wymiary_display && (
              <>
                <dt className="text-slate-500">Wymiary</dt>
                <dd className="text-slate-900">{product.wymiary_display}</dd>
              </>
            )}
            {product.material && (
              <>
                <dt className="text-slate-500">Materiał</dt>
                <dd className="text-slate-900">{product.material}</dd>
              </>
            )}
          </dl>
        </div>

        {/* Separator */}
        <hr className="border-slate-200" />

        {/* Description */}
        <div>
          <h4 className="text-xs font-semibold text-slate-700 mb-1">Opis</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {product.opis_czysty}
          </p>
        </div>

        {/* EAN */}
        {product.ean_raw && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] text-slate-400">EAN:</span>
            <span className="text-[11px] font-mono text-slate-600">{product.ean_raw}</span>
            <EanBadge status={product.ean_status} />
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add Allegro tab to product-detail-sheet.tsx**

In `src/components/dashboard/product-detail-sheet.tsx`:
- Import `Tabs, TabsList, TabsTrigger, TabsContent` from `@/components/ui/tabs`
- Import `AllegroPreview` from `./allegro-preview`
- Wrap the existing detail content in a `<TabsContent value="details">` and add a `<TabsContent value="allegro">` with `<AllegroPreview product={product} />`
- Add `<TabsList>` with two triggers: "Szczegóły" and "Podgląd Allegro"

- [ ] **Step 3: Verify build compiles**

Run: `npx next build 2>&1 | tail -10`

- [ ] **Step 4: Commit**

```bash
git add src/components/dashboard/allegro-preview.tsx src/components/dashboard/product-detail-sheet.tsx
git commit -m "feat: add Allegro listing preview mockup in detail sheet"
```

---

### Task 9: Add generateChangeLog and ChangeHistory component

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/lib/data-processor.ts`
- Create: `src/components/dashboard/change-history.tsx`
- Modify: `src/components/dashboard/before-after-tabs.tsx`

- [ ] **Step 1: Add ChangeLog types to types.ts**

Add to `src/lib/types.ts`:

```typescript
export type ChangeType = "changed" | "unchanged" | "problem";

export type ChangeLogField = {
  field: string;
  before: string;
  after: string;
  type: ChangeType;
  reason: string;
};

export type ChangeLogEntry = {
  sku: string;
  fields: ChangeLogField[];
};
```

- [ ] **Step 2: Add generateChangeLog to data-processor.ts**

Add and export at the bottom of `src/lib/data-processor.ts`:

```typescript
export function generateChangeLog(raw: RawProduct[], clean: CleanProduct[]): ChangeLogEntry[] {
  return raw.map((r, i) => {
    const c = clean[i];
    const fields: ChangeLogField[] = [];

    // Color — extract abbreviated color from raw name for comparison
    const colorAbbrevs = Object.keys(COLOR_MAP);
    const rawLower = r["NAZWA ORG"].toLowerCase();
    const rawColor = colorAbbrevs.find(abbr => rawLower.includes(abbr)) ?? "—";
    fields.push({
      field: "Kolor",
      before: rawColor,
      after: c.kolor ?? "—",
      type: rawColor !== (c.kolor ?? "—") ? "changed" : "unchanged",
      reason: rawColor !== (c.kolor ?? "—") ? "Normalizacja skrótu koloru" : "Bez zmian",
    });

    // Dimensions
    const rawDims = r["NAZWA ORG"].match(/\d{2,3}\s*[*xX]\s*\d{2,3}\s*cm/i)?.[0] ?? "—";
    fields.push({
      field: "Wymiary",
      before: rawDims,
      after: c.wymiary_display ?? "—",
      type: rawDims !== (c.wymiary_display ?? "—") ? "changed" : "unchanged",
      reason: rawDims !== (c.wymiary_display ?? "—") ? "Usunięto wiodące zera, normalizacja formatu" : "Bez zmian",
    });

    // Price
    fields.push({
      field: "Cena",
      before: r.Cena,
      after: c.cena_wartosc ? `${c.cena_wartosc} ${c.waluta}` : "—",
      type: r.Cena !== `${c.cena_wartosc} ${c.waluta}` ? "changed" : "unchanged",
      reason: r.Cena.includes(",") ? "Zamiana przecinka na kropkę" : r.Cena.includes("PLN") ? "Normalizacja formatu" : "Bez zmian",
    });

    // Description
    fields.push({
      field: "Opis",
      before: c.opis_format === "html" ? "HTML" : c.opis_format === "json-string" ? "JSON" : "Tekst",
      after: "Czysty tekst",
      type: c.opis_format !== "plain" ? "changed" : "unchanged",
      reason: c.opis_format === "html" ? "Usunięto tagi HTML" : c.opis_format === "json-string" ? "Wyciągnięto tekst z JSON sections" : "Bez zmian",
    });

    // Stock
    fields.push({
      field: "Stan",
      before: String(r.Stany),
      after: c.stan_status === "exact" ? String(c.stan_wartosc) : c.stan_status,
      type: c.stan_status === "non_exact" ? "problem" : "unchanged",
      reason: c.stan_status === "non_exact" ? `Wartość "${r.Stany}" nie jest liczbą` : "Wartość liczbowa OK",
    });

    // EAN
    fields.push({
      field: "EAN",
      before: r.EAN || "(pusty)",
      after: `${c.ean_raw ?? "—"} [${c.ean_status}]`,
      type: c.ean_status !== "valid" ? "problem" : "unchanged",
      reason: c.ean_status === "missing" ? "Brak kodu EAN"
        : c.ean_status === "non_numeric" ? "Zawiera znaki niebędące cyframi"
        : c.ean_status === "checksum_invalid" ? "Checksum EAN-13 niepoprawny"
        : "EAN-13 poprawny",
    });

    return { sku: c.sku, fields };
  });
}
```

Import `ChangeLogEntry` and `ChangeLogField` from types. Also export `COLOR_MAP` (add `export` keyword to its declaration) so `generateChangeLog` can reference the same abbreviation keys used by `extractColor`.

- [ ] **Step 3: Create change-history.tsx**

Create `src/components/dashboard/change-history.tsx`:

```tsx
"use client";

import { Badge } from "@/components/ui/badge";
import type { ChangeLogEntry, ChangeType } from "@/lib/types";

const badgeConfig: Record<ChangeType, { label: string; className: string }> = {
  changed: {
    label: "zmieniono",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  unchanged: {
    label: "bez zmian",
    className: "bg-muted text-muted-foreground border-border",
  },
  problem: {
    label: "problem",
    className: "bg-red-500/10 text-red-600 border-red-500/20",
  },
};

export function ChangeHistory({ entries }: { entries: ChangeLogEntry[] }) {
  const totalChanges = entries.reduce(
    (sum, e) => sum + e.fields.filter((f) => f.type !== "unchanged").length, 0
  );

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        {totalChanges} zmian w {entries.length} produktach
      </p>
      {entries.map((entry) => (
        <div key={entry.sku} className="rounded-lg border border-border/50 p-4">
          <p className="font-mono text-xs font-semibold mb-3">{entry.sku}</p>
          <div className="space-y-2">
            {entry.fields.map((field) => {
              const bc = badgeConfig[field.type];
              return (
                <div key={field.field} className="grid grid-cols-[80px_1fr_auto] items-start gap-2 text-xs">
                  <span className="text-muted-foreground font-medium">{field.field}</span>
                  <div className="flex items-start gap-1.5">
                    {field.type !== "unchanged" && (
                      <>
                        <span className="font-mono text-muted-foreground line-through">{field.before}</span>
                        <span className="text-muted-foreground">→</span>
                      </>
                    )}
                    <span className="font-mono">{field.after}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">({field.reason})</span>
                  </div>
                  <Badge variant="outline" className={`text-[10px] ${bc.className}`}>
                    {bc.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Add "Historia zmian" tab to before-after-tabs.tsx**

In `src/components/dashboard/before-after-tabs.tsx`:
- Import `ChangeHistory` from `./change-history`
- Import `generateChangeLog` from `@/lib/data-processor`
- Add prop type to accept existing products/rawProducts (already there)
- Compute with memoization: `const changelog = useMemo(() => generateChangeLog(rawProducts, products), [rawProducts, products]);` (import `useMemo` from react)
- Add 4th `<TabsTrigger value="changelog">Historia zmian ({totalChanges})</TabsTrigger>`
- Add `<TabsContent value="changelog"><ChangeHistory entries={changelog} /></TabsContent>`

- [ ] **Step 5: Verify build compiles**

Run: `npx next build 2>&1 | tail -10`

- [ ] **Step 6: Commit**

```bash
git add src/lib/types.ts src/lib/data-processor.ts src/components/dashboard/change-history.tsx src/components/dashboard/before-after-tabs.tsx
git commit -m "feat: add change history with per-field changelog and badges"
```

---

### Task 10: Polish — badge colors, hover states, transitions

**Files:**
- Modify: `src/components/dashboard/ean-badge.tsx`
- Modify: `src/components/dashboard/stock-badge.tsx`
- Modify: `src/components/dashboard/product-table.tsx`
- Modify: `src/components/dashboard/status-cards.tsx`

- [ ] **Step 1: Update EAN badge valid color to use primary (indigo)**

In `src/components/dashboard/ean-badge.tsx`, change `valid` config className to use `bg-primary/10 text-primary border-primary/20 hover:bg-primary/15` instead of emerald.

- [ ] **Step 2: Update Stock badge exact color to use primary (indigo)**

Same pattern in `src/components/dashboard/stock-badge.tsx` for `exact` status.

- [ ] **Step 3: Update table row hover to indigo**

In `src/components/dashboard/product-table.tsx`, change `hover:bg-muted/40` to `hover:bg-primary/5`.

- [ ] **Step 4: Add transition-colors to status cards, table rows, and badges**

Add `transition-colors duration-150` to Card, TableRow, and Badge wrappers where hover effects exist.

- [ ] **Step 5: Update StatusCards accent colors**

In `status-cards.tsx`, use `text-primary` for positive values instead of `text-emerald-500`.

- [ ] **Step 6: Verify build compiles and start dev server**

Run: `npx next build 2>&1 | tail -10`
Then: `npm run dev` and visually verify on http://localhost:4000

- [ ] **Step 7: Commit**

```bash
git add src/components/dashboard/ean-badge.tsx src/components/dashboard/stock-badge.tsx src/components/dashboard/product-table.tsx src/components/dashboard/status-cards.tsx
git commit -m "polish: indigo accent on badges, hover states, and transitions"
```

---

### Task 11: Final build verification and cleanup

**Files:**
- Possibly modify: any file with issues found during verification

- [ ] **Step 1: Full build**

Run: `npx next build 2>&1`
Expected: No errors, no warnings

- [ ] **Step 2: Start dev server and smoke test**

Run: `npm run dev`
Verify on http://localhost:4000:
- Theme toggle works (light ↔ dark with smooth transition)
- Status cards show correct numbers
- Table rows are clickable, sheet opens
- Allegro preview tab shows mockup
- Before/After tabs work including "Historia zmian"
- Drag & drop: drag a `.json` file onto header
- Export: both Excel and CSV download correctly
- Polish characters display correctly in exports

- [ ] **Step 3: Commit any fixes**

Note: Keep `src/app/api/export/route.ts` as a server-side fallback per spec.
