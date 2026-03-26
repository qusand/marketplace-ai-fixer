"use client";

import { useState, useCallback } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Header } from "./header";
import { StatusCards } from "./status-cards";
import { ProductTable } from "./product-table";
import { BeforeAfterTabs } from "./before-after-tabs";
import { useDesign } from "./design-provider";
import type { CleanProduct, RawProduct } from "@/lib/types";

type Props = {
  initialProducts: CleanProduct[];
  initialRawProducts: RawProduct[];
};

export function Dashboard({ initialProducts, initialRawProducts }: Props) {
  const [products, setProducts] = useState<CleanProduct[]>(initialProducts);
  const [rawProducts, setRawProducts] = useState<RawProduct[]>(initialRawProducts);
  const { isLinear } = useDesign();

  const handleDataUpdate = useCallback((raw: RawProduct[], clean: CleanProduct[]) => {
    setRawProducts(raw);
    setProducts(clean);
  }, []);

  /* ── Classic Layout ── */
  if (!isLinear) {
    return (
      <TooltipProvider delay={200}>
        <div className="min-h-screen bg-background">
          <Header products={products} onDataUpdate={handleDataUpdate} />

          <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-8">
            <StatusCards products={products} />

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

            <section>
              <h2 className="text-sm font-medium text-muted-foreground mb-3">
                Podgląd danych
              </h2>
              <BeforeAfterTabs products={products} rawProducts={rawProducts} />
            </section>
          </main>

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

  /* ── Linear Layout — nested containers with legend labels ── */
  return (
    <TooltipProvider delay={200}>
      <div className="min-h-screen bg-background">
        <Header products={products} onDataUpdate={handleDataUpdate} />

        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Outer container */}
          <div className="linear-container">
            <span className="linear-label">MARKETPLACE AI-FIXER</span>

            <div className="space-y-8">
              {/* Status overview */}
              <StatusCards products={products} />

              {/* Thin separator */}
              <div className="border-t border-border" />

              {/* Product table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-muted-foreground">
                    {products.length} produktów przetworzonych
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Kliknij wiersz, aby zobaczyć szczegóły
                  </p>
                </div>
                <ProductTable products={products} rawProducts={rawProducts} />
              </div>

              {/* Thin separator */}
              <div className="border-t border-border" />

              {/* Before/after comparison */}
              <BeforeAfterTabs products={products} rawProducts={rawProducts} />
            </div>
          </div>
        </main>

        <footer className="mt-10">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5">
            <p className="text-[11px] text-muted-foreground text-center">
              Marketplace AI-Fixer &middot; Zadanie rekrutacyjne vAutomate / Commerion Group
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
