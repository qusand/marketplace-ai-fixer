"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EanBadge } from "./ean-badge";
import { StockBadge } from "./stock-badge";
import { ProductDetailExpanded } from "./product-detail-expanded";
import type { CleanProduct, RawProduct } from "@/lib/types";

type Props = {
  products: CleanProduct[];
  rawProducts: RawProduct[];
};

export function ProductTable({ products, rawProducts }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="text-xs font-semibold uppercase tracking-wider w-[140px]">
                SKU
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider w-[120px]">
                Kolor
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider w-[120px]">
                Wymiary
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider w-[90px] text-right">
                Cena
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider w-[110px] text-center">
                Stan
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider w-[100px] text-center">
                EAN
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider">
                Tytuł Allegro
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <TableRow
                  key={product.sku}
                  data-expanded={isExpanded || undefined}
                  className="group cursor-pointer transition-colors duration-150 hover:bg-primary/5 data-[expanded]:bg-primary/5 data-[expanded]:border-b-0"
                  onClick={() =>
                    setExpandedIndex(isExpanded ? null : i)
                  }
                >
                  <TableCell className="font-mono text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                      {product.sku}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {product.kolor ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm tabular-nums">
                    {product.wymiary_display ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm text-right tabular-nums">
                    {product.cena_wartosc
                      ? `${product.cena_wartosc} zł`
                      : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    <StockBadge
                      status={product.stan_status}
                      value={product.stan_wartosc}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <EanBadge status={product.ean_status} />
                  </TableCell>
                  <TableCell className="text-sm max-w-[300px]">
                    <div className="truncate" title={product.tytul_allegro}>
                      {product.tytul_allegro}
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {product.tytul_allegro.length}/75
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Expanded detail panel — rendered outside the table for full width */}
      {expandedIndex !== null && (
        <ProductDetailExpanded
          product={products[expandedIndex]}
          rawProduct={rawProducts[expandedIndex]}
          onCollapse={() => setExpandedIndex(null)}
        />
      )}
    </div>
  );
}
