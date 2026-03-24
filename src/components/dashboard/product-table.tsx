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
  onSelectProduct: (product: CleanProduct) => void;
}

export function ProductTable({ products, onSelectProduct }: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border/50">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground w-[140px]">
              SKU
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Kolor
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Wymiary
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
              Cena
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">
              Stan
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">
              EAN
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tytuł Allegro
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.sku}
              className="cursor-pointer transition-colors"
              onClick={() => onSelectProduct(product)}
            >
              <TableCell className="font-mono text-sm font-medium">
                {product.sku}
              </TableCell>
              <TableCell className="text-sm">
                {product.kolor ?? "—"}
              </TableCell>
              <TableCell className="text-sm tabular-nums">
                {product.wymiary_display ?? "—"}
              </TableCell>
              <TableCell className="text-sm text-right tabular-nums">
                {product.cena_wartosc ? `${product.cena_wartosc} ${product.waluta}` : "—"}
              </TableCell>
              <TableCell className="text-center">
                <StanBadge status={product.stan_status} value={product.stan_wartosc} />
              </TableCell>
              <TableCell className="text-center">
                <EanBadge status={product.ean_status} />
              </TableCell>
              <TableCell className="text-sm max-w-[300px] truncate">
                {product.tytul_allegro}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
