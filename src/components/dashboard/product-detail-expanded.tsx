"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronUp } from "lucide-react";
import { EanBadge } from "./ean-badge";
import { StockBadge } from "./stock-badge";
import { AllegroPreview } from "./allegro-preview";
import { useDesign } from "./design-provider";
import type { CleanProduct, RawProduct } from "@/lib/types";

type Props = {
  product: CleanProduct;
  rawProduct: RawProduct;
  onCollapse: () => void;
};

/* ── Shared sub-components ── */

function DetailRow({
  label,
  children,
  linear,
}: {
  label: string;
  children: React.ReactNode;
  linear?: boolean;
}) {
  if (linear) {
    return (
      <div className="flex items-baseline gap-4 py-2 border-b border-border/20 last:border-0">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest w-[100px] shrink-0">
          {label}
        </span>
        <span className="text-[13px]">{children}</span>
      </div>
    );
  }
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
  linear,
}: {
  label: string;
  before: string;
  after: string;
  linear?: boolean;
}) {
  const changed = before !== after;

  if (linear) {
    return (
      <div className="py-2">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-1.5">
          {label}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-border/40 rounded px-3 py-2">
            <p className="text-[9px] text-muted-foreground mb-0.5">Przed</p>
            <p className="text-xs font-mono break-all">{before || "—"}</p>
          </div>
          <div className={`border rounded px-3 py-2 ${changed ? "border-foreground/20" : "border-border/40"}`}>
            <p className="text-[9px] text-muted-foreground mb-0.5">Po</p>
            <p className="text-xs font-mono break-all">{after || "—"}</p>
          </div>
        </div>
      </div>
    );
  }

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

/* ── Main component ── */

export function ProductDetailExpanded({
  product,
  rawProduct,
  onCollapse,
}: Props) {
  const { isLinear } = useDesign();
  const formatLabel =
    product.opis_format === "html"
      ? "HTML"
      : product.opis_format === "json-string"
        ? "JSON"
        : "Tekst";

  return (
    <div className={`border-t animate-in slide-in-from-top-2 fade-in duration-200 ${
      isLinear ? "bg-background border-border" : "bg-muted/20 border-border/30"
    }`}>
      <div className={isLinear ? "px-5 sm:px-8 py-5 sm:py-6" : "px-3 sm:px-6 py-4 sm:py-5"}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className={isLinear ? "text-[13px] font-medium" : "text-base font-semibold"}>
              {product.sku}
            </h3>
            <p className={`text-muted-foreground mt-0.5 ${isLinear ? "text-[11px]" : "text-xs"}`}>
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
          <TabsList variant={isLinear ? "line" : "default"}>
            <TabsTrigger value="details">Szczegóły</TabsTrigger>
            <TabsTrigger value="compare">Porównanie</TabsTrigger>
            <TabsTrigger value="allegro">Podgląd</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {/* Left column — product fields */}
              <div>
                <DetailRow label="Kolor" linear={isLinear}>
                  {product.kolor ?? "—"}
                </DetailRow>
                <DetailRow label="Wymiary" linear={isLinear}>
                  {product.wymiary_display ?? "—"}
                </DetailRow>
                <DetailRow label="Cena" linear={isLinear}>
                  {product.cena_wartosc
                    ? `${product.cena_wartosc} ${product.waluta}`
                    : "—"}
                </DetailRow>
                <DetailRow label="Stan" linear={isLinear}>
                  <StockBadge
                    status={product.stan_status}
                    value={product.stan_wartosc}
                  />
                </DetailRow>
                <DetailRow label="EAN" linear={isLinear}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">
                      {product.ean_raw ?? "—"}
                    </span>
                    <EanBadge status={product.ean_status} />
                  </div>
                </DetailRow>
                <DetailRow label="Format opisu" linear={isLinear}>
                  <Badge variant="outline" className="text-xs">
                    {formatLabel}
                  </Badge>
                </DetailRow>
              </div>

              {/* Right column — Allegro title */}
              <div>
                <p className={`font-medium text-muted-foreground uppercase mb-2 ${
                  isLinear ? "text-[10px] tracking-widest" : "text-xs tracking-wider"
                }`}>
                  Tytuł Allegro
                </p>
                <div className={`rounded px-3 py-2.5 ${
                  isLinear
                    ? "border border-border"
                    : "bg-primary/5 ring-1 ring-primary/10 rounded-md"
                }`}>
                  <p className={isLinear ? "text-[13px] font-medium" : "text-sm font-medium"}>
                    {product.tytul_allegro}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {product.tytul_allegro.length}/75 znaków
                  </p>
                </div>
                <div className={`mt-3 rounded px-3 py-2.5 text-xs text-muted-foreground leading-relaxed ${
                  isLinear ? "border border-border/50" : "bg-muted/50 rounded-md"
                }`}>
                  <p className={`font-medium mb-1 ${isLinear ? "text-foreground/60" : "text-foreground/70"}`}>
                    Dlaczego taki tytuł?
                  </p>
                  <p>
                    Przeskanowaliśmy ~20 najlepiej sprzedających się ofert na Allegro
                    dla &quot;dywanik łazienkowy Belweder&quot; za pomocą Claude Code
                    + Claude-in-Chrome. Belweder to rozpoznawalna linia produktowa
                    e-floor (50+ ocen, 17 kupujących ostatnio). Top oferty używają
                    lowercase, zawierają cechy (antypoślizgowy, chłonny) i materiał.
                    Tytuł generujemy regułami — każda cecha musi mieć źródło
                    w opisie tego konkretnego produktu. Dane testowe są ubogie
                    (brak &quot;pleciony&quot;, &quot;bawełna&quot;, &quot;do prania&quot;),
                    więc tytuły są krótsze niż byłyby z prawdziwym eksportem —
                    pipeline wyciągnie więcej cech z bogatszych opisów.
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
                linear={isLinear}
                before={
                  rawProduct["NAZWA ORG"].split("cm").pop()?.trim() ?? ""
                }
                after={product.kolor ?? ""}
              />
              <CompareBlock
                label="Wymiary"
                linear={isLinear}
                before={
                  rawProduct["NAZWA ORG"].match(
                    /\d{2,3}\s*[*xX]\s*\d{2,3}\s*cm/i
                  )?.[0] ?? ""
                }
                after={product.wymiary_display ?? ""}
              />
              <CompareBlock
                label="Cena"
                linear={isLinear}
                before={rawProduct.Cena}
                after={
                  product.cena_wartosc
                    ? `${product.cena_wartosc} ${product.waluta}`
                    : ""
                }
              />
              <CompareBlock
                label="Opis"
                linear={isLinear}
                before={
                  rawProduct["Opis ofe"].length > 120
                    ? rawProduct["Opis ofe"].substring(0, 120) + "…"
                    : rawProduct["Opis ofe"]
                }
                after={product.opis_czysty}
              />
              <CompareBlock
                label="Stany"
                linear={isLinear}
                before={String(rawProduct.Stany)}
                after={
                  product.stan_status === "exact"
                    ? String(product.stan_wartosc)
                    : product.stan_status
                }
              />
              <CompareBlock
                label="EAN"
                linear={isLinear}
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
