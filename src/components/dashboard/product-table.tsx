"use client";

import type { CleanProduct } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EanBadge, StanBadge } from "./status-badge";

interface ProductTableProps {
  products: CleanProduct[];
  selectedSku: string | null;
  onSelectProduct: (product: CleanProduct) => void;
}

export function ProductTable({ products, selectedSku, onSelectProduct }: ProductTableProps) {
  return (
    <div className="rounded-lg border border-border/60 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/30">
              <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 w-[130px] pl-4">
                SKU
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 w-[110px]">
                Kolor
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 w-[100px]">
                Wymiary
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 w-[90px] text-right">
                Cena
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 w-[90px] text-center">
                Stan
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 w-[100px] text-center">
                EAN
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 pr-4">
                Tytuł Allegro
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const isSelected = product.sku === selectedSku;
              return (
                <TableRow
                  key={product.sku}
                  className={`cursor-pointer transition-colors duration-75 ${
                    isSelected
                      ? "bg-accent"
                      : "hover:bg-muted/40"
                  }`}
                  onClick={() => onSelectProduct(product)}
                >
                  <TableCell className="font-mono text-[13px] font-medium pl-4 py-3">
                    {product.sku}
                  </TableCell>
                  <TableCell className="text-[13px] capitalize">
                    {product.kolor ?? "—"}
                  </TableCell>
                  <TableCell className="text-[13px] tabular-nums text-muted-foreground">
                    {product.wymiary_display ?? "—"}
                  </TableCell>
                  <TableCell className="text-[13px] text-right tabular-nums">
                    {product.cena_wartosc ? `${product.cena_wartosc}` : "—"}
                    {product.waluta && (
                      <span className="text-muted-foreground/50 ml-1 text-[11px]">{product.waluta}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <StanBadge status={product.stan_status} value={product.stan_wartosc} />
                  </TableCell>
                  <TableCell className="text-center">
                    <EanBadge status={product.ean_status} />
                  </TableCell>
                  <TableCell className="text-[13px] pr-4 max-w-[340px]">
                    <span className="line-clamp-1">{product.tytul_allegro}</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
