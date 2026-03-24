"use client";

import type { CleanProduct, RawProduct } from "@/lib/types";
import { EanBadge, StanBadge } from "./status-badge";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface ProductDetailSheetProps {
  product: CleanProduct | null;
  rawProduct: RawProduct | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailSheet({
  product,
  rawProduct,
  open,
  onOpenChange,
}: ProductDetailSheetProps) {
  if (!product) return null;

  const titleLen = product.tytul_allegro.length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-mono text-sm">
            {product.sku}
          </SheetTitle>
          <SheetDescription>
            <span className="capitalize">{product.kolor}</span>
            {product.wymiary_display && (
              <span className="text-muted-foreground/60"> · {product.wymiary_display}</span>
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 pb-6 space-y-6">
          {/* ── Allegro Title ── */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Label>Tytuł Allegro</Label>
              <span
                className={`text-[10px] tabular-nums font-mono ${
                  titleLen > 70
                    ? "text-amber-400"
                    : "text-muted-foreground/40"
                }`}
              >
                {titleLen}/75
              </span>
            </div>
            <p className="text-[15px] font-medium leading-snug text-foreground">
              {product.tytul_allegro}
            </p>
          </div>

          <div className="h-px bg-border/40" />

          {/* ── Cleaned data ── */}
          <div className="space-y-4">
            <Label className="text-primary/70">Dane oczyszczone</Label>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Kolor">
                <span className="capitalize text-foreground/90">
                  {product.kolor ?? "—"}
                </span>
              </Field>
              <Field label="Wymiary">
                <span className="text-foreground/90">
                  {product.wymiary_display ?? "—"}
                </span>
              </Field>
              <Field label="Cena" mono>
                {product.cena_wartosc
                  ? `${product.cena_wartosc} ${product.waluta}`
                  : "—"}
              </Field>
              <Field label="Stan">
                <StanBadge
                  status={product.stan_status}
                  value={product.stan_wartosc}
                />
              </Field>
              <Field label="EAN" mono>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    {product.ean_raw || "—"}
                  </span>
                  <EanBadge status={product.ean_status} />
                </div>
              </Field>
              <Field label="Format opisu">
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono border-border/50"
                >
                  {product.opis_format}
                </Badge>
              </Field>
            </div>

            <div className="pt-2">
              <Field label="Opis oczyszczony">
                <p className="text-foreground/75 leading-relaxed text-sm">
                  {product.opis_czysty}
                </p>
              </Field>
            </div>
          </div>

          {/* ── Raw source data ── */}
          {rawProduct && (
            <>
              <div className="h-px bg-border/40" />
              <div className="space-y-4">
                <Label>Dane źródłowe (oryginał)</Label>
                <div className="rounded-md border border-border/30 bg-background/50 p-4 space-y-3">
                  <Field label="Nazwa oryginalna">
                    <span className="text-muted-foreground text-sm">
                      {rawProduct["NAZWA ORG"]}
                    </span>
                  </Field>
                  <Field label="Cena (surowa)" mono>
                    <span className="text-muted-foreground">
                      {rawProduct.Cena}
                    </span>
                  </Field>
                  <Field label="Stan (surowy)" mono>
                    <span className="text-muted-foreground">
                      {String(rawProduct.Stany)}
                    </span>
                  </Field>
                  <Field label="EAN (surowy)" mono>
                    <span className="text-muted-foreground">
                      {rawProduct.EAN || "—"}
                    </span>
                  </Field>
                </div>

                <div className="pt-1">
                  <Field label="Opis surowy">
                    <pre className="text-[11px] font-mono whitespace-pre-wrap break-all text-muted-foreground/60 bg-background/50 rounded-md p-3 border border-border/30 max-h-36 overflow-y-auto leading-relaxed">
                      {rawProduct["Opis ofe"]}
                    </pre>
                  </Field>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/50 ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

function Field({
  label,
  children,
  mono,
}: {
  label: string;
  children: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
        {label}
      </p>
      <div
        className={`text-sm leading-relaxed ${mono ? "font-mono text-[13px]" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
