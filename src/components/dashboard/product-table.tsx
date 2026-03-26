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
import { useDesign } from "./design-provider";
import type { CleanProduct, RawProduct } from "@/lib/types";

type Props = {
  products: CleanProduct[];
  rawProducts: RawProduct[];
};

export function ProductTable({ products, rawProducts }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { isLinear } = useDesign();

  // Reset expanded row when dataset changes (e.g. new file dropped)
  const validExpanded =
    expandedIndex !== null && expandedIndex < products.length
      ? expandedIndex
      : null;

  const thClass = isLinear
    ? "text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70"
    : "text-xs font-semibold uppercase tracking-wider";

  return (
    <div className={`overflow-hidden ${isLinear ? "rounded-md border border-border" : "rounded-lg border border-border/50"}`}>
      <div className="overflow-x-auto">
        <Table className={isLinear ? "w-full" : "min-w-[700px]"}>
          <TableHeader>
            <TableRow className={isLinear ? "bg-muted/20 hover:bg-muted/20" : "bg-muted/30 hover:bg-muted/30"}>
              <TableHead className={`${thClass} w-[130px] sm:w-[140px]`}>SKU</TableHead>
              <TableHead className={`${thClass} w-[100px] sm:w-[120px]`}>Kolor</TableHead>
              <TableHead className={`${thClass} w-[100px] sm:w-[120px]`}>Wymiary</TableHead>
              <TableHead className={`${thClass} w-[80px] sm:w-[90px] text-right`}>Cena</TableHead>
              <TableHead className={`${thClass} w-[90px] sm:w-[110px] text-center`}>Stan</TableHead>
              <TableHead className={`${thClass} w-[90px] sm:w-[100px] text-center`}>EAN</TableHead>
              <TableHead className={thClass}>Tytuł Allegro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, i) => {
              const isExpanded = validExpanded === i;
              return (
                <TableRow
                  key={product.sku}
                  data-expanded={isExpanded || undefined}
                  className={
                    isLinear
                      ? "group cursor-pointer transition-colors duration-300 hover:bg-muted/40 data-[expanded]:bg-muted/40 data-[expanded]:border-b-0"
                      : "group cursor-pointer transition-colors duration-300 hover:bg-primary/5 data-[expanded]:bg-primary/5 data-[expanded]:border-b-0"
                  }
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                >
                  <TableCell className="font-mono text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <ChevronDown
                        className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                      <span className="truncate">{product.sku}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm truncate">
                    {product.kolor ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm tabular-nums truncate">
                    {product.wymiary_display ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm text-right tabular-nums">
                    {product.cena_wartosc ? `${product.cena_wartosc} zł` : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    <StockBadge status={product.stan_status} value={product.stan_wartosc} />
                  </TableCell>
                  <TableCell className="text-center">
                    <EanBadge status={product.ean_status} />
                  </TableCell>
                  <TableCell className="text-sm max-w-[200px] sm:max-w-[300px]">
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
      {validExpanded !== null && (
        <ProductDetailExpanded
          product={products[validExpanded]}
          rawProduct={rawProducts[validExpanded]}
          onCollapse={() => setExpandedIndex(null)}
        />
      )}
    </div>
  );
}
