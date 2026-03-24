"use client";

import { useState } from "react";
import type { CleanProduct, RawProduct } from "@/lib/types";
import { cleanProducts } from "@/lib/pipeline";
import rawData from "@/data/partner_export_dirty.json";
import { StatusCards } from "@/components/dashboard/status-cards";
import { ProductTable } from "@/components/dashboard/product-table";
import { ProductDetailSheet } from "@/components/dashboard/product-detail";
import { BeforeAfter } from "@/components/dashboard/before-after";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { DownloadIcon } from "lucide-react";

const rawProducts = rawData as RawProduct[];
const products = cleanProducts(rawProducts);

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<CleanProduct | null>(
    null
  );
  const [exporting, setExporting] = useState<"xlsx" | "csv" | null>(null);

  const handleSelectProduct = (product: CleanProduct) => {
    setSelectedProduct(product);
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
      URL.revokeObjectURL(url);
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
                · {products.length} rekordy przetworzone
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
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

        {/* ── Product Detail Sheet (slide-out) ── */}
        <ProductDetailSheet
          product={selectedProduct}
          rawProduct={selectedRaw}
          open={selectedProduct !== null}
          onOpenChange={(open) => {
            if (!open) setSelectedProduct(null);
          }}
        />

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
      className={`text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60 ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}
