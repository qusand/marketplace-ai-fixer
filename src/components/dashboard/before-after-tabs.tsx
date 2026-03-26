"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CleanProduct, RawProduct } from "@/lib/types";
import { generateChangeLog } from "@/lib/pipeline";
import { ChangeHistory } from "./change-history";
import { useDesign } from "./design-provider";

type Props = {
  products: CleanProduct[];
  rawProducts: RawProduct[];
};

export function BeforeAfterTabs({ products, rawProducts }: Props) {
  const { isLinear } = useDesign();
  const changelog = useMemo(() => generateChangeLog(rawProducts, products), [rawProducts, products]);
  const totalChanges = changelog.reduce(
    (sum, e) => sum + e.fields.filter((f) => f.type !== "unchanged").length, 0
  );

  const tabTriggerClass = isLinear
    ? "text-[10px] sm:text-[11px] px-2 sm:px-3 h-7 tracking-wide"
    : "text-[11px] sm:text-xs px-2 sm:px-3 h-7";

  return (
    <Tabs defaultValue="after" className="w-full">
      <TabsList variant={isLinear ? "line" : "default"} className={`w-full sm:w-auto overflow-x-auto scrollbar-none ${isLinear ? "h-9 pb-1" : "h-8"}`}>
        <TabsTrigger value="after" className={tabTriggerClass}>
          Po czyszczeniu
        </TabsTrigger>
        <TabsTrigger value="before" className={tabTriggerClass}>
          Dane surowe
        </TabsTrigger>
        <TabsTrigger value="compare" className={tabTriggerClass}>
          Porównanie
        </TabsTrigger>
        <TabsTrigger value="changelog" className={tabTriggerClass}>
          <span className="hidden sm:inline">Historia zmian</span>
          <span className="sm:hidden">Historia</span>
          {" "}({totalChanges})
        </TabsTrigger>
      </TabsList>

      {/* Fixed-height wrapper prevents layout shift between tabs */}
      <div className="mt-3 min-h-[280px]">
        <TabsContent value="after" className="mt-0">
          <div className={`rounded-lg border ${isLinear ? "border-border/30" : "border-border/50"} overflow-hidden`}>
            <div className="overflow-x-auto">
              <Table className="table-fixed w-full min-w-[600px]">
                <colgroup>
                  <col className="w-[14%]" />
                  <col className="w-[12%]" />
                  <col className="w-[12%]" />
                  <col className="w-[10%]" />
                  <col className="w-[52%]" />
                </colgroup>
                <TableHeader>
                  <TableRow className={isLinear ? "bg-muted/20 hover:bg-muted/20" : "bg-muted/30 hover:bg-muted/30"}>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">SKU</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Kolor</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Wymiary</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Cena</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Opis (oczyszczony)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.sku} className="h-[48px]">
                      <TableCell className="font-mono text-xs truncate">{p.sku}</TableCell>
                      <TableCell className="text-sm truncate">{p.kolor ?? "—"}</TableCell>
                      <TableCell className="text-sm tabular-nums truncate">{p.wymiary_display ?? "—"}</TableCell>
                      <TableCell className="text-sm tabular-nums truncate">{p.cena_wartosc ? `${p.cena_wartosc} PLN` : "—"}</TableCell>
                      <TableCell className="text-xs truncate">{p.opis_czysty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="before" className="mt-0">
          <div className={`rounded-lg border ${isLinear ? "border-border/30" : "border-border/50"} overflow-hidden`}>
            <div className="overflow-x-auto">
              <Table className="table-fixed w-full min-w-[600px]">
                <colgroup>
                  <col className="w-[14%]" />
                  <col className="w-[24%]" />
                  <col className="w-[10%]" />
                  <col className="w-[8%]" />
                  <col className="w-[44%]" />
                </colgroup>
                <TableHeader>
                  <TableRow className={isLinear ? "bg-muted/20 hover:bg-muted/20" : "bg-muted/30 hover:bg-muted/30"}>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">SKU</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Nazwa oryginalna</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Cena</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Stany</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Opis oferty (surowy)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rawProducts.map((p) => (
                    <TableRow key={p.SKU} className="h-[48px]">
                      <TableCell className="font-mono text-xs truncate">{p.SKU}</TableCell>
                      <TableCell className="text-xs truncate">{p["NAZWA ORG"]}</TableCell>
                      <TableCell className="text-xs truncate">{p.Cena}</TableCell>
                      <TableCell className="text-xs truncate">{String(p.Stany)}</TableCell>
                      <TableCell className="text-xs truncate font-mono text-[11px]">{p["Opis ofe"]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compare" className="mt-0">
          <div className="space-y-3">
            {products.map((p, i) => {
              const raw = rawProducts[i];
              return (
                <div
                  key={p.sku}
                  className={`rounded-lg border p-4 ${isLinear ? "border-border/30" : "border-border/50"}`}
                >
                  <p className="font-mono text-xs font-semibold mb-3">
                    {p.sku}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {[
                      { label: "Nazwa", before: raw["NAZWA ORG"], after: `${p.kolor ?? ""} | ${p.wymiary_display ?? ""}` },
                      { label: "Cena", before: raw.Cena, after: p.cena_wartosc ? `${p.cena_wartosc} PLN` : "—" },
                      { label: "Stan", before: String(raw.Stany), after: p.stan_status === "exact" ? String(p.stan_wartosc) : p.stan_status },
                      { label: "EAN", before: raw.EAN || "(pusty)", after: `${p.ean_raw ?? "—"} [${p.ean_status}]` },
                    ].map((row) => (
                      <div key={row.label} className="flex gap-2">
                        <span className="text-[10px] font-medium text-muted-foreground uppercase w-12 shrink-0 pt-0.5">
                          {row.label}
                        </span>
                        <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-start gap-1.5">
                          <span className="text-xs font-mono bg-red-500/5 rounded px-1.5 py-0.5 line-through text-muted-foreground truncate">
                            {row.before}
                          </span>
                          <span className="text-muted-foreground text-[10px] pt-0.5">→</span>
                          <span className="text-xs font-mono bg-primary/5 rounded px-1.5 py-0.5 truncate">
                            {row.after}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="changelog" className="mt-0">
          <ChangeHistory entries={changelog} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
