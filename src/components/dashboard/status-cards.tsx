import type { CleanProduct } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface StatusCardsProps {
  products: CleanProduct[];
}

export function StatusCards({ products }: StatusCardsProps) {
  const total = products.length;
  const eanIssues = products.filter(
    (p) => p.ean_status !== "valid"
  ).length;
  const stockIssues = products.filter(
    (p) => p.stan_status !== "exact"
  ).length;
  const allOk = products.filter(
    (p) => p.ean_status === "valid" && p.stan_status === "exact"
  ).length;

  const cards = [
    { label: "Produkty", value: total, accent: false },
    { label: "Bez problemów", value: allOk, accent: false },
    { label: "Problemy EAN", value: eanIssues, accent: eanIssues > 0 },
    { label: "Problemy stanów", value: stockIssues, accent: stockIssues > 0 },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="border-border/50">
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {card.label}
            </p>
            <p
              className={`text-2xl font-semibold tabular-nums mt-1 ${
                card.accent ? "text-destructive" : "text-foreground"
              }`}
            >
              {card.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
