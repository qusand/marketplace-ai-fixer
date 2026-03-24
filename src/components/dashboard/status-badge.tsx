import type { EanStatus, StanStatus } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* ── EAN Badge ── */

const EAN_CONFIG: Record<
  EanStatus,
  { text: string; className: string; tip: string }
> = {
  valid: {
    text: "Poprawny",
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    tip: "EAN-13 przechodzi walidację checksum",
  },
  missing: {
    text: "Brak",
    className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    tip: "Pole EAN jest puste",
  },
  non_numeric: {
    text: "Błędny",
    className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    tip: "Zawiera znaki inne niż cyfry",
  },
  checksum_invalid: {
    text: "Checksum",
    className:
      "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    tip: "13 cyfr, ale checksum EAN-13 nie zgadza się",
  },
};

export function EanBadge({ status }: { status: EanStatus }) {
  const cfg = EAN_CONFIG[status];
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-default">
        <span
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide ${cfg.className}`}
        >
          {cfg.text}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{cfg.tip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

/* ── Stan Badge ── */

const STAN_CONFIG: Record<
  StanStatus,
  { className: string; tip: string }
> = {
  exact: {
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    tip: "Dokładna wartość magazynowa",
  },
  non_exact: {
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    tip: 'Wartość przybliżona (np. "dużo")',
  },
  empty: {
    className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    tip: "Brak danych o stanie",
  },
};

export function StanBadge({
  status,
  value,
}: {
  status: StanStatus;
  value: number | null;
}) {
  const cfg = STAN_CONFIG[status];
  const display =
    status === "exact"
      ? value === 0
        ? "0 szt."
        : `${value} szt.`
      : status === "non_exact"
        ? "~nieznany"
        : "—";

  return (
    <Tooltip>
      <TooltipTrigger className="cursor-default">
        <span
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tabular-nums tracking-wide ${cfg.className}`}
        >
          {display}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{cfg.tip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
