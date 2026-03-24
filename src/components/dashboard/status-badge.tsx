import type { EanStatus, StanStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EAN_LABELS: Record<EanStatus, { text: string; variant: "default" | "secondary" | "destructive" | "outline"; tip: string }> = {
  valid:            { text: "Poprawny",  variant: "default",     tip: "EAN-13 przechodzi walidację checksum" },
  missing:          { text: "Brak",      variant: "destructive", tip: "Pole EAN jest puste" },
  non_numeric:      { text: "Błędny",    variant: "destructive", tip: "Zawiera znaki inne niż cyfry" },
  checksum_invalid: { text: "Checksum ✗", variant: "outline",    tip: "13 cyfr, ale checksum EAN-13 nie zgadza się" },
};

const STAN_LABELS: Record<StanStatus, { variant: "default" | "secondary" | "destructive" | "outline"; tip: string }> = {
  exact:     { variant: "default",     tip: "Dokładna wartość magazynowa" },
  non_exact: { variant: "secondary",   tip: 'Warto\u015b\u0107 przybli\u017cona (np. "du\u017co")' },
  empty:     { variant: "destructive", tip: "Brak danych o stanie" },
};

export function EanBadge({ status }: { status: EanStatus }) {
  const cfg = EAN_LABELS[status];
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-default">
        <Badge variant={cfg.variant} className="text-[11px] tracking-wide font-medium whitespace-nowrap">
          {cfg.text}
        </Badge>
      </TooltipTrigger>
      <TooltipContent><p className="text-xs">{cfg.tip}</p></TooltipContent>
    </Tooltip>
  );
}

export function StanBadge({ status, value }: { status: StanStatus; value: number | null }) {
  const cfg = STAN_LABELS[status];
  const display = status === "exact"
    ? (value === 0 ? "0 szt." : `${value} szt.`)
    : status === "non_exact" ? "~nieznany" : "—";

  return (
    <Tooltip>
      <TooltipTrigger className="cursor-default">
        <Badge variant={cfg.variant} className="text-[11px] tracking-wide font-medium tabular-nums whitespace-nowrap">
          {display}
        </Badge>
      </TooltipTrigger>
      <TooltipContent><p className="text-xs">{cfg.tip}</p></TooltipContent>
    </Tooltip>
  );
}
