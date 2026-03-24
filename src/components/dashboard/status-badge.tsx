import type { EanStatus, StanStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EAN_CONFIG: Record<EanStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; tooltip: string }> = {
  valid: { label: "OK", variant: "default", tooltip: "EAN-13 poprawny — checksum przechodzi" },
  missing: { label: "Brak", variant: "destructive", tooltip: "Brak kodu EAN" },
  non_numeric: { label: "Błąd", variant: "destructive", tooltip: "EAN zawiera znaki niebędące cyframi" },
  checksum_invalid: { label: "Checksum", variant: "destructive", tooltip: "EAN nie przechodzi walidacji checksum EAN-13" },
};

const STAN_CONFIG: Record<StanStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; tooltip: string }> = {
  exact: { label: "Dokładny", variant: "default", tooltip: "Dokładna wartość stanu magazynowego" },
  non_exact: { label: "Niedokładny", variant: "secondary", tooltip: "Stan podany jako tekst (np. \"dużo\") — brak dokładnej wartości" },
  empty: { label: "Brak", variant: "destructive", tooltip: "Brak informacji o stanie magazynowym" },
};

export function EanBadge({ status }: { status: EanStatus }) {
  const config = EAN_CONFIG[status];
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-default">
        <Badge variant={config.variant} className="text-xs font-medium">
          {config.label}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs max-w-[200px]">{config.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function StanBadge({ status, value }: { status: StanStatus; value: number | null }) {
  const config = STAN_CONFIG[status];
  const displayValue = status === "exact" ? `${value}` : config.label;
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-default">
        <Badge variant={config.variant} className="text-xs font-medium tabular-nums">
          {displayValue}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs max-w-[200px]">{config.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
