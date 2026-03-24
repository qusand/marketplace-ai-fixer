"use client";

import type { CleanProduct, RawProduct } from "@/lib/types";
import { EanBadge, StanBadge } from "./status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface ProductDetailProps {
  product: CleanProduct;
  rawProduct: RawProduct | undefined;
  onClose: () => void;
}

export function ProductDetail({
  product,
  rawProduct,
  onClose,
}: ProductDetailProps) {
  const titleLen = product.tytul_allegro.length;

  return (
    <Card className="animate-in fade-in-0 slide-in-from-top-1 duration-200 border-border/60">
      {/* ── Header bar ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/40 bg-muted/15 rounded-t-lg">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-primary">
            {product.sku}
          </span>
          <span className="text-muted-foreground/30">·</span>
          <span className="text-sm text-foreground/80 capitalize">
            {product.kolor}
          </span>
          <span className="text-xs text-muted-foreground/40 tabular-nums">
            {product.wymiary_display}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 text-muted-foreground/50 hover:text-foreground"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-5">
        {/* ── Allegro Title — prominent ── */}
        <div className="mb-5">
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

        <div className="h-px bg-border/40 mb-5" />

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Cleaned data */}
          <div className="space-y-4">
            <Label className="mb-3 text-primary/70">Dane oczyszczone</Label>

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

          {/* Right: Raw source data */}
          {rawProduct && (
            <div className="space-y-4">
              <Label className="mb-3">Dane źródłowe (oryginał)</Label>

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
          )}
        </div>
      </CardContent>
    </Card>
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
      className={`text-[11px] font-medium uppercase tracking-widest text-muted-foreground/70 ${className ?? ""}`}
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
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50">
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
