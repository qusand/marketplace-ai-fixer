"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronUp } from "lucide-react";
import { EanBadge } from "./ean-badge";
import { StockBadge } from "./stock-badge";
import { AllegroPreview } from "./allegro-preview";
import type { CleanProduct, RawProduct } from "@/lib/types";

type Props = {
  product: CleanProduct;
  rawProduct: RawProduct;
  onCollapse: () => void;
};

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-1 sm:gap-3 py-2.5 border-b border-border/30 last:border-0">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-0.5">
        {label}
      </span>
      <span className="text-sm leading-relaxed">{children}</span>
    </div>
  );
}

function CompareBlock({
  label,
  before,
  after,
}: {
  label: string;
  before: string;
  after: string;
}) {
  const changed = before !== after;
  return (
    <div className="py-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md bg-muted/50 px-3 py-2">
          <p className="text-[10px] text-muted-foreground mb-0.5">Przed</p>
          <p className="text-xs font-mono break-all">{before || "—"}</p>
        </div>
        <div
          className={`rounded-md px-3 py-2 ${changed ? "bg-primary/5 ring-1 ring-primary/20" : "bg-muted/50"}`}
        >
          <p className="text-[10px] text-muted-foreground mb-0.5">Po</p>
          <p className="text-xs font-mono break-all">{after || "—"}</p>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailExpanded({
  product,
  rawProduct,
  onCollapse,
}: Props) {
  const formatLabel =
    product.opis_format === "html"
      ? "HTML"
      : product.opis_format === "json-string"
        ? "JSON"
        : "Tekst";

  return (
    <div className="bg-muted/20 border-t border-border/30 animate-in slide-in-from-top-2 fade-in duration-200">
      <div className="px-3 sm:px-6 py-4 sm:py-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold">{product.sku}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {product.nazwa_org}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCollapse();
            }}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1 rounded-md hover:bg-muted/50"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>

        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Szczegóły</TabsTrigger>
            <TabsTrigger value="compare">Porównanie</TabsTrigger>
            <TabsTrigger value="allegro">Podgląd Allegro</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {/* Left column — product fields */}
              <div>
                <DetailRow label="Kolor">
                  {product.kolor ?? "—"}
                </DetailRow>
                <DetailRow label="Wymiary">
                  {product.wymiary_display ?? "—"}
                </DetailRow>
                <DetailRow label="Cena">
                  {product.cena_wartosc
                    ? `${product.cena_wartosc} ${product.waluta}`
                    : "—"}
                </DetailRow>
                <DetailRow label="Stan">
                  <StockBadge
                    status={product.stan_status}
                    value={product.stan_wartosc}
                  />
                </DetailRow>
                <DetailRow label="EAN">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">
                      {product.ean_raw ?? "—"}
                    </span>
                    <EanBadge status={product.ean_status} />
                  </div>
                </DetailRow>
                <DetailRow label="Format opisu">
                  <Badge variant="outline" className="text-xs">
                    {formatLabel}
                  </Badge>
                </DetailRow>
              </div>

              {/* Right column — Allegro title */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Tytuł Allegro
                </p>
                <div className="rounded-md bg-primary/5 ring-1 ring-primary/10 px-3 py-2.5">
                  <p className="text-sm font-medium">
                    {product.tytul_allegro}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {product.tytul_allegro.length}/75 znaków
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Compare Tab */}
          <TabsContent value="compare" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
              <CompareBlock
                label="Kolor"
                before={
                  rawProduct["NAZWA ORG"].split("cm").pop()?.trim() ?? ""
                }
                after={product.kolor ?? ""}
              />
              <CompareBlock
                label="Wymiary"
                before={
                  rawProduct["NAZWA ORG"].match(
                    /\d{2,3}\s*[*xX]\s*\d{2,3}\s*cm/i
                  )?.[0] ?? ""
                }
                after={product.wymiary_display ?? ""}
              />
              <CompareBlock
                label="Cena"
                before={rawProduct.Cena}
                after={
                  product.cena_wartosc
                    ? `${product.cena_wartosc} ${product.waluta}`
                    : ""
                }
              />
              <CompareBlock
                label="Opis"
                before={
                  rawProduct["Opis ofe"].length > 120
                    ? rawProduct["Opis ofe"].substring(0, 120) + "…"
                    : rawProduct["Opis ofe"]
                }
                after={product.opis_czysty}
              />
              <CompareBlock
                label="Stany"
                before={String(rawProduct.Stany)}
                after={
                  product.stan_status === "exact"
                    ? String(product.stan_wartosc)
                    : product.stan_status
                }
              />
              <CompareBlock
                label="EAN"
                before={rawProduct.EAN}
                after={`${product.ean_raw ?? ""} (${product.ean_status})`}
              />
            </div>
          </TabsContent>

          {/* Allegro Preview Tab */}
          <TabsContent value="allegro" className="mt-4">
            <AllegroPreview product={product} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
