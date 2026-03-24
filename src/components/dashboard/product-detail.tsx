"use client";

import type { CleanProduct, RawProduct } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { EanBadge, StanBadge } from "./status-badge";

interface ProductDetailProps {
  product: CleanProduct | null;
  rawProducts: RawProduct[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DetailRow({ label, value, mono }: { label: string; value: string | number | null; mono?: boolean }) {
  return (
    <div className="flex justify-between items-baseline gap-4 py-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider shrink-0">
        {label}
      </span>
      <span className={`text-sm text-right ${mono ? "font-mono" : ""}`}>
        {value ?? "—"}
      </span>
    </div>
  );
}

export function ProductDetail({ product, rawProducts, open, onOpenChange }: ProductDetailProps) {
  if (!product) return null;

  const rawProduct = rawProducts.find((r) => r.SKU === product.sku);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-mono text-base">
            {product.sku}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Allegro Title */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              Tytuł Allegro
            </p>
            <p className="text-sm font-medium leading-relaxed">
              {product.tytul_allegro}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {product.tytul_allegro.length} / 75 znaków
            </p>
          </div>

          <Separator />

          {/* Cleaned Data */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Dane oczyszczone
            </p>
            <DetailRow label="Kolor" value={product.kolor} />
            <DetailRow label="Wymiary" value={product.wymiary_display} />
            <DetailRow label="Cena" value={product.cena_wartosc ? `${product.cena_wartosc} ${product.waluta}` : null} mono />
            <div className="flex justify-between items-center py-1.5">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Stan</span>
              <StanBadge status={product.stan_status} value={product.stan_wartosc} />
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">EAN</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono">{product.ean_raw ?? "—"}</span>
                <EanBadge status={product.ean_status} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Cleaned Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Opis oczyszczony
              </p>
              <span className="text-xs text-muted-foreground font-mono">
                {product.opis_format}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">
              {product.opis_czysty}
            </p>
          </div>

          <Separator />

          {/* Raw Data */}
          {rawProduct && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Dane surowe (oryginał)
              </p>
              <div className="bg-muted/50 rounded-md p-3 space-y-2">
                <DetailRow label="Nazwa" value={rawProduct["NAZWA ORG"]} />
                <DetailRow label="Cena" value={rawProduct.Cena} mono />
                <DetailRow label="Stan" value={String(rawProduct.Stany)} />
                <DetailRow label="EAN" value={rawProduct.EAN} mono />
                <div className="pt-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Opis surowy
                  </p>
                  <pre className="text-xs font-mono whitespace-pre-wrap break-all text-foreground/70 bg-background rounded p-2 border max-h-40 overflow-y-auto">
                    {rawProduct["Opis ofe"]}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
