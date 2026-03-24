import type { CleanProduct } from "@/lib/types";

interface StatusCardsProps {
  products: CleanProduct[];
}

export function StatusCards({ products }: StatusCardsProps) {
  const total = products.length;
  const eanOk = products.filter((p) => p.ean_status === "valid").length;
  const eanBad = total - eanOk;
  const stockExact = products.filter((p) => p.stan_status === "exact").length;
  const stockBad = total - stockExact;

  return (
    <div className="grid grid-cols-4 gap-px bg-border/60 rounded-lg overflow-hidden border border-border/60">
      <Metric label="Rekordy" value={total} />
      <Metric label="EAN poprawne" value={eanOk} total={total} good />
      <Metric label="EAN problemy" value={eanBad} total={total} bad={eanBad > 0} />
      <Metric label="Stan niedokładny" value={stockBad} total={total} bad={stockBad > 0} />
    </div>
  );
}

function Metric({
  label,
  value,
  total,
  good,
  bad,
}: {
  label: string;
  value: number;
  total?: number;
  good?: boolean;
  bad?: boolean;
}) {
  return (
    <div className="bg-card px-4 py-3">
      <p className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-widest leading-none mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-1.5">
        <span
          className={`text-xl font-semibold tabular-nums leading-none ${
            bad ? "text-red-500" : good ? "text-emerald-600" : "text-foreground"
          }`}
        >
          {value}
        </span>
        {total !== undefined && (
          <span className="text-xs text-muted-foreground/50 tabular-nums">
            / {total}
          </span>
        )}
      </div>
    </div>
  );
}
