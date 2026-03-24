"use client";

import { useState, useCallback } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Header } from "./header";
import { StatusCards } from "./status-cards";
import { ProductTable } from "./product-table";
import { BeforeAfterTabs } from "./before-after-tabs";
import type { CleanProduct, RawProduct } from "@/lib/types";

type Props = {
  initialProducts: CleanProduct[];
  initialRawProducts: RawProduct[];
};

export function Dashboard({ initialProducts, initialRawProducts }: Props) {
  const [products, setProducts] = useState<CleanProduct[]>(initialProducts);
  const [rawProducts, setRawProducts] = useState<RawProduct[]>(initialRawProducts);

  const handleDataUpdate = useCallback((raw: RawProduct[], clean: CleanProduct[]) => {
    setRawProducts(raw);
    setProducts(clean);
  }, []);

  return (
    <TooltipProvider delay={200}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header products={products} onDataUpdate={handleDataUpdate} />

        {/* Content */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-8">
          {/* Status Cards */}
          <StatusCards products={products} />

          {/* Product Table */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                Produkty ({products.length})
              </h2>
              <p className="text-[10px] text-muted-foreground">
                Kliknij wiersz, aby zobaczyć szczegóły
              </p>
            </div>
            <ProductTable products={products} rawProducts={rawProducts} />
          </section>

          <Separator />

          {/* Before/After */}
          <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">
              Podgląd danych
            </h2>
            <BeforeAfterTabs products={products} rawProducts={rawProducts} />
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-[11px] text-muted-foreground text-center">
              Marketplace AI-Fixer &middot; Zadanie rekrutacyjne vAutomate / Commerion Group
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
