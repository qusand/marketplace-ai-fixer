"use client";

import type { CleanProduct, RawProduct } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BeforeAfterProps {
  products: CleanProduct[];
  rawProducts: RawProduct[];
}

export function BeforeAfter({ products, rawProducts }: BeforeAfterProps) {
  return (
    <Tabs defaultValue="after" className="w-full">
      <TabsList className="grid w-full max-w-xs grid-cols-2">
        <TabsTrigger value="before" className="text-xs">
          Przed (surowe)
        </TabsTrigger>
        <TabsTrigger value="after" className="text-xs">
          Po (oczyszczone)
        </TabsTrigger>
      </TabsList>

      <TabsContent value="before" className="mt-3">
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">SKU</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nazwa oryginalna</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cena</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stany</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">EAN</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground max-w-[300px]">Opis (fragment)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rawProducts.map((raw) => (
                <TableRow key={raw.SKU}>
                  <TableCell className="font-mono text-sm">{raw.SKU}</TableCell>
                  <TableCell className="text-sm">{raw["NAZWA ORG"]}</TableCell>
                  <TableCell className="text-sm font-mono">{raw.Cena}</TableCell>
                  <TableCell className="text-sm font-mono">{String(raw.Stany)}</TableCell>
                  <TableCell className="text-sm font-mono">{raw.EAN || "—"}</TableCell>
                  <TableCell className="text-xs font-mono max-w-[300px] truncate text-muted-foreground">
                    {raw["Opis ofe"].substring(0, 80)}…
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="after" className="mt-3">
        <div className="overflow-x-auto rounded-lg border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">SKU</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kolor</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Wymiary</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cena</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Format opisu</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground max-w-[300px]">Opis oczyszczony</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.sku}>
                  <TableCell className="font-mono text-sm">{p.sku}</TableCell>
                  <TableCell className="text-sm">{p.kolor}</TableCell>
                  <TableCell className="text-sm tabular-nums">{p.wymiary_display}</TableCell>
                  <TableCell className="text-sm font-mono tabular-nums">{p.cena_wartosc} PLN</TableCell>
                  <TableCell>
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {p.opis_format}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm max-w-[300px] truncate">
                    {p.opis_czysty}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}
