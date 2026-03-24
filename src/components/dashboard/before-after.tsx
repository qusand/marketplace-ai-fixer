"use client";

import type { CleanProduct, RawProduct } from "@/lib/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
      <TabsList className="w-fit bg-muted/30">
        <TabsTrigger value="before" className="text-xs tracking-wide">
          Przed (surowe)
        </TabsTrigger>
        <TabsTrigger value="after" className="text-xs tracking-wide">
          Po (oczyszczone)
        </TabsTrigger>
      </TabsList>

      {/* Fixed-height wrapper prevents layout shift between tabs */}
      <div className="mt-3 min-h-[264px]">
        <TabsContent value="before" className="mt-0">
          <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="table-fixed w-full">
                <colgroup>
                  <col className="w-[14%]" />
                  <col className="w-[26%]" />
                  <col className="w-[10%]" />
                  <col className="w-[8%]" />
                  <col className="w-[14%]" />
                  <col className="w-[28%]" />
                </colgroup>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/40">
                    <Th className="pl-4">SKU</Th>
                    <Th>Nazwa oryginalna</Th>
                    <Th>Cena</Th>
                    <Th>Stany</Th>
                    <Th>EAN</Th>
                    <Th className="pr-4">Opis (fragment)</Th>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rawProducts.map((raw) => (
                    <TableRow
                      key={raw.SKU}
                      className="hover:bg-muted/20 border-border/30 h-[52px]"
                    >
                      <TableCell className="font-mono text-[13px] font-medium pl-4 truncate">
                        {raw.SKU}
                      </TableCell>
                      <TableCell className="text-[13px] truncate text-foreground/80">
                        {raw["NAZWA ORG"]}
                      </TableCell>
                      <TableCell className="font-mono text-[13px] text-muted-foreground truncate">
                        {raw.Cena}
                      </TableCell>
                      <TableCell className="font-mono text-[13px] text-muted-foreground truncate">
                        {String(raw.Stany)}
                      </TableCell>
                      <TableCell className="font-mono text-[13px] text-muted-foreground truncate">
                        {raw.EAN || "—"}
                      </TableCell>
                      <TableCell className="text-[12px] font-mono truncate text-muted-foreground/50 pr-4">
                        {raw["Opis ofe"].substring(0, 60)}…
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="after" className="mt-0">
          <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="table-fixed w-full">
                <colgroup>
                  <col className="w-[14%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[46%]" />
                </colgroup>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/40">
                    <Th className="pl-4">SKU</Th>
                    <Th>Kolor</Th>
                    <Th>Wymiary</Th>
                    <Th>Cena</Th>
                    <Th>Format</Th>
                    <Th className="pr-4">Opis oczyszczony</Th>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow
                      key={p.sku}
                      className="hover:bg-muted/20 border-border/30 h-[52px]"
                    >
                      <TableCell className="font-mono text-[13px] font-medium pl-4 truncate">
                        {p.sku}
                      </TableCell>
                      <TableCell className="text-[13px] capitalize text-foreground/80 truncate">
                        {p.kolor}
                      </TableCell>
                      <TableCell className="text-[13px] tabular-nums text-muted-foreground truncate">
                        {p.wymiary_display}
                      </TableCell>
                      <TableCell className="font-mono text-[13px] tabular-nums text-foreground/80 truncate">
                        {p.cena_wartosc}{" "}
                        <span className="text-muted-foreground/50 text-[11px]">
                          PLN
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="text-[10px] font-mono border-border/50"
                        >
                          {p.opis_format}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[13px] pr-4 truncate">
                        <span className="line-clamp-1 text-muted-foreground">
                          {p.opis_czysty}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
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
