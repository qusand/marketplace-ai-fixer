"use client";

import { useState, useMemo, useCallback } from "react";
import type { CleanProduct, RawProduct } from "@/lib/types";
import { cleanProducts } from "@/lib/pipeline";
import defaultRawData from "@/data/partner_export_dirty.json";
import { StatusCards } from "@/components/dashboard/status-cards";
import { ProductTable } from "@/components/dashboard/product-table";
import { ProductDetail } from "@/components/dashboard/product-detail";
import { BeforeAfter } from "@/components/dashboard/before-after";
import { DropZone } from "@/components/dashboard/drop-zone";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { DownloadIcon, RotateCcwIcon } from "lucide-react";

const BUNDLED_RAW = defaultRawData as RawProduct[];

export default function Home() {
  const [rawProducts, setRawProducts] = useState<RawProduct[]>(BUNDLED_RAW);
  const [customFile, setCustomFile] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<CleanProduct | null>(
    null
  );
  const [exporting, setExporting] = useState<"xlsx" | "csv" | null>(null);

  const products = useMemo(() => cleanProducts(rawProducts), [rawProducts]);

  const handleFileAccepted = useCallback(
    (data: RawProduct[], fileName: string) => {
      setRawProducts(data);
      setCustomFile(fileName);
      setSelectedProduct(null);
    },
    []
  );

  const handleReset = useCallback(() => {
    setRawProducts(BUNDLED_RAW);
    setCustomFile(null);
    setSelectedProduct(null);
  }, []);

  const handleSelectProduct = (product: CleanProduct) => {
    setSelectedProduct((prev) =>
      prev?.sku === product.sku ? null : product
    );
  };

  const handleExport = async (format: "xlsx" | "csv") => {
    setExporting(format);
    try {
      const response = await fetch(`/api/export/${format}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      });
      if (!response.ok) throw new Error("Export failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `marketplace_ai_fixer_export.${format}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setExporting(null);
    }
  };

  const selectedRaw = selectedProduct
    ? rawProducts.find((r) => r.SKU === selectedProduct.sku)
    : undefined;

  return (
    <main className="min-h-screen">
      <div className="max-w-[1120px] mx-auto px-6 py-10">
        {/* ── Header ── */}
        <header className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                Marketplace AI-Fixer
              </h1>
              <span className="text-xs font-mono text-muted-foreground/60 bg-muted/50 px-2 py-0.5 rounded">
                v1.0
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Czyszczenie i normalizacja danych produktowych
              <span className="text-muted-foreground/50 ml-1.5">
                · {products.length} {products.length === 1 ? "rekord" : products.length < 5 ? "rekordy" : "rekordów"} {products.length === 1 ? "przetworzony" : products.length < 5 ? "przetworzone" : "przetworzonych"}
              </span>
              {customFile && (
                <span className="text-primary/70 ml-1.5">· {customFile}</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {customFile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs h-8 gap-1.5 text-muted-foreground"
              >
                <RotateCcwIcon className="h-3.5 w-3.5" />
                Reset
              </Button>
            )}
            <ModeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("csv")}
              disabled={exporting !== null}
              className="text-xs h-8 gap-1.5"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              CSV
            </Button>
            <Button
              size="sm"
              onClick={() => handleExport("xlsx")}
              disabled={exporting !== null}
              className="text-xs h-8 gap-1.5"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              Excel
            </Button>
          </div>
        </header>

        {/* ── Drop Zone ── */}
        <section className="mb-6">
          <DropZone onFileAccepted={handleFileAccepted} />
        </section>

        {/* ── Status Overview ── */}
        <section className="mb-8">
          <StatusCards products={products} />
        </section>

        {/* ── Product Table ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Produkty</SectionLabel>
            <p className="text-xs text-muted-foreground/40">
              Kliknij wiersz aby zobaczyć szczegóły
            </p>
          </div>
          <ProductTable
            products={products}
            selectedSku={selectedProduct?.sku ?? null}
            onSelectProduct={handleSelectProduct}
          />
        </section>

        {/* ── Inline Detail (expands below table) ── */}
        {selectedProduct && (
          <section className="mt-4">
            <ProductDetail
              product={selectedProduct}
              rawProduct={selectedRaw}
              onClose={() => setSelectedProduct(null)}
            />
          </section>
        )}

        {/* ── Before / After ── */}
        <section className="mt-10">
          <SectionLabel className="mb-3">Porównanie danych</SectionLabel>
          <BeforeAfter products={products} rawProducts={rawProducts} />
        </section>

        {/* ── Footer ── */}
        <footer className="mt-12 pt-6 border-t border-border/40">
          <p className="text-xs text-muted-foreground/40 text-center">
            Marketplace AI-Fixer · Zadanie rekrutacyjne vAutomate · Deterministic data pipeline, no AI guessing
          </p>
        </footer>
      </div>
    </main>
  );
}

function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-xs font-medium uppercase tracking-widest text-muted-foreground ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}
