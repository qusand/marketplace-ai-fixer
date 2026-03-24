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
  const [detailOpen, setDetailOpen] = useState(false);

  const handleSelectProduct = (product: CleanProduct) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  };

  const handleExportXlsx = async () => {
    const response = await fetch("/api/export/xlsx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketplace_ai_fixer_export.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = async () => {
    const response = await fetch("/api/export/csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketplace_ai_fixer_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Marketplace AI-Fixer
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Oczyszczone dane produktowe · {products.length} rekordów
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCsv} className="text-xs">
              Pobierz CSV
            </Button>
            <Button size="sm" onClick={handleExportXlsx} className="text-xs">
              Pobierz Excel
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <StatusCards products={products} />

        <Separator className="opacity-50" />

        {/* Main Table */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Produkty
          </p>
          <ProductTable products={products} onSelectProduct={handleSelectProduct} />
          <p className="text-xs text-muted-foreground mt-2">
            Kliknij wiersz, aby zobaczyć szczegóły produktu
          </p>
        </div>

        <Separator className="opacity-50" />

        {/* Before / After Comparison */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Porównanie danych
          </p>
          <BeforeAfter products={products} rawProducts={rawProducts} />
        </div>
      </div>

      {/* Detail Panel */}
      <ProductDetail
        product={selectedProduct}
        rawProducts={rawProducts}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </main>
  );
}
