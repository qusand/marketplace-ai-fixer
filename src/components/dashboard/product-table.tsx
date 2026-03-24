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

export function ProductTable({
  products,
  selectedSku,
  onSelectProduct,
}: ProductTableProps) {
  return (
    <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/40">
              <Th className="w-[140px] pl-4">SKU</Th>
              <Th className="w-[110px]">Kolor</Th>
              <Th className="w-[110px]">Wymiary</Th>
              <Th className="w-[90px] text-right">Cena</Th>
              <Th className="w-[100px] text-center">Stan</Th>
              <Th className="w-[100px] text-center">EAN</Th>
              <Th className="pr-4">Tytuł Allegro</Th>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const isSelected = product.sku === selectedSku;
              return (
                <TableRow
                  key={product.sku}
                  className={`cursor-pointer transition-colors duration-100 border-border/30 ${
                    isSelected
                      ? "bg-primary/5 border-l-2 border-l-primary"
                      : "hover:bg-muted/30"
                  }`}
                  onClick={() => onSelectProduct(product)}
                >
                  <TableCell className="font-mono text-[13px] font-medium pl-4 py-3.5 text-foreground">
                    {product.sku}
                  </TableCell>
                  <TableCell className="text-[13px] capitalize text-foreground/90">
                    {product.kolor ?? "—"}
                  </TableCell>
                  <TableCell className="text-[13px] tabular-nums text-muted-foreground">
                    {product.wymiary_display ?? "—"}
                  </TableCell>
                  <TableCell className="text-[13px] text-right tabular-nums text-foreground/90">
                    {product.cena_wartosc ? (
                      <>
                        {product.cena_wartosc}
                        <span className="text-muted-foreground/50 ml-1 text-[11px]">
                          {product.waluta}
                        </span>
                      </>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <StanBadge
                      status={product.stan_status}
                      value={product.stan_wartosc}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <EanBadge status={product.ean_status} />
                  </TableCell>
                  <TableCell className="text-[13px] pr-4 max-w-[340px] text-muted-foreground">
                    <span className="line-clamp-1">
                      {product.tytul_allegro}
                    </span>
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

function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TableHead
      className={`text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 bg-muted/20 h-10 ${className ?? ""}`}
    >
      {children}
    </TableHead>
  );
}
