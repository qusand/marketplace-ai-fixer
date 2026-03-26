"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { StanStatus } from "@/lib/types";

const config: Record<
  StanStatus,
  { tooltip: string; className: string }
> = {
  exact: {
    tooltip: "Dokładna wartość stanu magazynowego",
    className: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 transition-colors duration-150",
  },
  non_exact: {
    tooltip: "Wartość przybliżona — dane źródłowe nie zawierały liczby",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/15 transition-colors duration-150",
  },
  empty: {
    tooltip: "Brak informacji o stanie magazynowym",
    className: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/15 transition-colors duration-150",
  },
};

export function StockBadge({
  status,
  value,
}: {
  status: StanStatus;
  value: number | null;
}) {
  const c = config[status];
  const display =
    status === "exact"
      ? value === 0
        ? "0"
        : String(value)
      : status === "non_exact"
        ? "~nieokreślony"
        : "brak danych";

  return (
    <Tooltip>
      <TooltipTrigger
        render={<Badge variant="outline" className={c.className} />}
      >
        {display}
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs">
        {c.tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
