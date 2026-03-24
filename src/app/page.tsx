"use client";

import { useState } from "react";
import type { CleanProduct, RawProduct } from "@/lib/types";
import { cleanProducts } from "@/lib/pipeline";
import rawData from "@/data/partner_export_dirty.json";
import { StatusCards } from "@/components/dashboard/status-cards";
import { ProductTable } from "@/components/dashboard/product-table";
import { ProductDetail } from "@/components/dashboard/product-detail";
import { BeforeAfter } from "@/components/dashboard/before-after";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const rawProducts = rawData as RawProduct[];
const products = cleanProducts(rawProducts);

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<CleanProduct | null>(null);

  const handleSelectProduct = (product: CleanProduct) => {
    setSelectedProduct((prev) =>
      prev?.sku === product.sku ? null : product
    );
  };

  const handleExport = async (format: "xlsx" | "csv") => {
    const response = await fetch(`/api/export/${format}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `marketplace_ai_fixer_export.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedRaw = selectedProduct
    ? rawProducts.find((r) => r.SKU === selectedProduct.sku)
    : undefined;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-5 py-8">
        {/* Header */}
        <header className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-[15px] font-semibold tracking-tight text-foreground">
              Marketplace AI-Fixer
            </h1>
            <p className="text-[13px] text-muted-foreground/60 mt-0.5">
              Czyszczenie danych produktowych · {products.length} rekordów przetworzonych
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("csv")}
              className="text-[12px] h-8 px-3"
            >
              Eksport CSV
            </Button>
            <Button
              size="sm"
              onClick={() => handleExport("xlsx")}
              className="text-[12px] h-8 px-3"
            >
              Eksport Excel
            </Button>
          </div>
        </header>

        {/* Status Cards */}
        <section className="mb-6">
          <StatusCards products={products} />
        </section>

        {/* Main Table */}
        <section className="mb-2">
          <div className="flex items-center justify-between mb-3">
            <SectionLabel>Produkty</SectionLabel>
            <p className="text-[11px] text-muted-foreground/40">
              Kliknij wiersz aby rozwinąć szczegóły
            </p>
          </div>
          <ProductTable
            products={products}
            selectedSku={selectedProduct?.sku ?? null}
            onSelectProduct={handleSelectProduct}
          />
        </section>

        {/* Inline Detail View */}
        {selectedProduct && (
          <section className="mb-6 mt-4">
            <ProductDetail
              product={selectedProduct}
              rawProduct={selectedRaw}
              onClose={() => setSelectedProduct(null)}
            />
          </section>
        )}

        <Separator className="my-6 opacity-30" />

        {/* Before / After Comparison */}
        <section className="mb-8">
          <SectionLabel className="mb-3">Porównanie danych</SectionLabel>
          <BeforeAfter products={products} rawProducts={rawProducts} />
        </section>
      </div>
    </main>
  );
}

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 ${className ?? ""}`}>
      {children}
    </h2>
  );
}
