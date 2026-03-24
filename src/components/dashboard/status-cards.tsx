"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package, ShieldCheck, BarChart3, AlertTriangle } from "lucide-react";
import type { CleanProduct } from "@/lib/types";

type Props = {
  products: CleanProduct[];
};

export function StatusCards({ products }: Props) {
  const total = products.length;
  const eanOk = products.filter((p) => p.ean_status === "valid").length;
  const eanProblems = total - eanOk;
  const stockExact = products.filter((p) => p.stan_status === "exact").length;
  const stockProblems = total - stockExact;
  const outOfStock = products.filter(
    (p) => p.stan_status === "exact" && p.stan_wartosc === 0
  ).length;

  const cards = [
    {
      label: "Produkty",
      value: total,
      sub: "przetworzone",
      accent: "text-primary",
      icon: Package,
      iconColor: "text-primary/60",
    },
    {
      label: "EAN poprawne",
      value: eanOk,
      sub: `${eanProblems} z problemami`,
      accent: eanProblems > 0 ? "text-red-500" : "text-primary",
      icon: ShieldCheck,
      iconColor: eanProblems > 0 ? "text-red-500/40" : "text-primary/60",
    },
    {
      label: "Stany dokładne",
      value: stockExact,
      sub: `${stockProblems} niedokładne`,
      accent: stockProblems > 0 ? "text-amber-500" : "text-primary",
      icon: BarChart3,
      iconColor: stockProblems > 0 ? "text-amber-500/40" : "text-primary/60",
    },
    {
      label: "Brak w magazynie",
      value: outOfStock,
      sub: `z ${total} produktów`,
      accent: outOfStock > 0 ? "text-amber-500" : "text-primary",
      icon: AlertTriangle,
      iconColor: outOfStock > 0 ? "text-amber-500/40" : "text-primary/60",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} className="border-border/40 dark:border-border/20 transition-colors duration-150 hover:border-primary/30">
            <CardContent className="pt-6 pb-5 px-6">
              <div className="flex items-start justify-between">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                  {card.label}
                </p>
                <Icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
              <p className={`text-4xl font-bold mt-3 tracking-tight ${card.accent}`}>
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1.5">{card.sub}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
