import type { CleanProduct } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  PackageIcon,
  ShieldCheckIcon,
  ShieldAlertIcon,
  AlertTriangleIcon,
} from "lucide-react";

interface StatusCardsProps {
  products: CleanProduct[];
}

export function StatusCards({ products }: StatusCardsProps) {
  const total = products.length;
  const eanOk = products.filter((p) => p.ean_status === "valid").length;
  const eanBad = total - eanOk;
  const stockExact = products.filter((p) => p.stan_status === "exact").length;
  const stockIssues = total - stockExact;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <MetricCard
        label="Rekordy"
        value={total}
        icon={PackageIcon}
        color="default"
      />
      <MetricCard
        label="EAN poprawne"
        value={eanOk}
        total={total}
        icon={ShieldCheckIcon}
        color="green"
      />
      <MetricCard
        label="EAN problemy"
        value={eanBad}
        total={total}
        icon={ShieldAlertIcon}
        color={eanBad > 0 ? "red" : "default"}
      />
      <MetricCard
        label="Stan niedokładny"
        value={stockIssues}
        total={total}
        icon={AlertTriangleIcon}
        color={stockIssues > 0 ? "amber" : "default"}
      />
    </div>
  );
}

type MetricColor = "default" | "green" | "red" | "amber";

const COLOR_STYLES: Record<
  MetricColor,
  { icon: string; value: string; dot: string }
> = {
  default: {
    icon: "text-muted-foreground/60",
    value: "text-foreground",
    dot: "bg-muted-foreground/30",
  },
  green: {
    icon: "text-emerald-400",
    value: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  red: {
    icon: "text-red-400",
    value: "text-red-400",
    dot: "bg-red-400",
  },
  amber: {
    icon: "text-amber-400",
    value: "text-amber-400",
    dot: "bg-amber-400",
  },
};

function MetricCard({
  label,
  value,
  total,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  total?: number;
  icon: React.ComponentType<{ className?: string }>;
  color: MetricColor;
}) {
  const styles = COLOR_STYLES[color];

  return (
    <Card size="sm" className="border-border/60">
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-xs font-medium text-muted-foreground/70 tracking-wide">
            {label}
          </p>
          <Icon className={`h-4 w-4 ${styles.icon}`} />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span
            className={`text-2xl font-semibold tabular-nums leading-none ${styles.value}`}
          >
            {value}
          </span>
          {total !== undefined && (
            <span className="text-sm text-muted-foreground/40 tabular-nums">
              / {total}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
