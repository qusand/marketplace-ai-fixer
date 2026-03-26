"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { EanStatus } from "@/lib/types";

const config: Record<
  EanStatus,
  { label: string; tooltip: string; className: string }
> = {
  valid: {
    label: "OK",
    tooltip: "EAN-13 poprawny (checksum OK)",
    className: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 transition-colors duration-150",
  },
  checksum_invalid: {
    label: "Checksum",
    tooltip: "EAN ma 13 cyfr, ale nie przechodzi walidacji checksum EAN-13",
    className: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/15 transition-colors duration-150",
  },
  missing: {
    label: "Brak",
    tooltip: "Brak kodu EAN w danych źródłowych",
    className: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/15 transition-colors duration-150",
  },
  non_numeric: {
    label: "Błąd",
    tooltip: "EAN zawiera znaki niebędące cyframi",
    className: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/15 transition-colors duration-150",
  },
};

export function EanBadge({ status }: { status: EanStatus }) {
  const c = config[status];
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Badge variant="outline" className={c.className} />}
      >
        {c.label}
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs">
        {c.tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
