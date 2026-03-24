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
import { Badge } from "@/components/ui/badge";

interface BeforeAfterProps {
  products: CleanProduct[];
  rawProducts: RawProduct[];
}

export function BeforeAfter({ products, rawProducts }: BeforeAfterProps) {
  return (
    <Tabs defaultValue="after" className="w-full">
      <TabsList className="w-fit">
        <TabsTrigger value="before" className="text-[11px] tracking-wide">
          Przed (surowe)
        </TabsTrigger>
        <TabsTrigger value="after" className="text-[11px] tracking-wide">
          Po (oczyszczone)
        </TabsTrigger>
      </TabsList>

      <TabsContent value="before" className="mt-3">
        <div className="rounded-lg border border-border/60 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/30">
                  <Th>SKU</Th>
                  <Th>Nazwa oryginalna</Th>
                  <Th>Cena</Th>
                  <Th>Stany</Th>
                  <Th>EAN</Th>
                  <Th>Opis (fragment)</Th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rawProducts.map((raw) => (
                  <TableRow key={raw.SKU} className="hover:bg-muted/20">
                    <TableCell className="font-mono text-[13px] font-medium pl-4">{raw.SKU}</TableCell>
                    <TableCell className="text-[13px] max-w-[260px] truncate">{raw["NAZWA ORG"]}</TableCell>
                    <TableCell className="font-mono text-[13px] text-muted-foreground">{raw.Cena}</TableCell>
                    <TableCell className="font-mono text-[13px] text-muted-foreground">{String(raw.Stany)}</TableCell>
                    <TableCell className="font-mono text-[13px] text-muted-foreground">{raw.EAN || "—"}</TableCell>
                    <TableCell className="text-[12px] font-mono max-w-[280px] truncate text-muted-foreground/60 pr-4">
                      {raw["Opis ofe"].substring(0, 70)}…
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="after" className="mt-3">
        <div className="rounded-lg border border-border/60 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/30">
                  <Th>SKU</Th>
                  <Th>Kolor</Th>
                  <Th>Wymiary</Th>
                  <Th>Cena</Th>
                  <Th>Format</Th>
                  <Th>Opis oczyszczony</Th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.sku} className="hover:bg-muted/20">
                    <TableCell className="font-mono text-[13px] font-medium pl-4">{p.sku}</TableCell>
                    <TableCell className="text-[13px] capitalize">{p.kolor}</TableCell>
                    <TableCell className="text-[13px] tabular-nums text-muted-foreground">{p.wymiary_display}</TableCell>
                    <TableCell className="font-mono text-[13px] tabular-nums">{p.cena_wartosc} PLN</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {p.opis_format}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[13px] max-w-[300px] pr-4">
                      <span className="line-clamp-1 text-muted-foreground">{p.opis_czysty}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 first:pl-4 last:pr-4">
      {children}
    </TableHead>
  );
}
