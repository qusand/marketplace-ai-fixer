"use client";

import { Badge } from "@/components/ui/badge";
import type { ChangeLogEntry, ChangeType } from "@/lib/types";

const badgeConfig: Record<ChangeType, { label: string; className: string }> = {
  changed: {
    label: "zmieniono",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  unchanged: {
    label: "bez zmian",
    className: "bg-muted text-muted-foreground border-border",
  },
  problem: {
    label: "problem",
    className: "bg-red-500/10 text-red-600 border-red-500/20",
  },
};

export function ChangeHistory({ entries }: { entries: ChangeLogEntry[] }) {
  const totalChanges = entries.reduce(
    (sum, e) => sum + e.fields.filter((f) => f.type !== "unchanged").length, 0
  );

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        {totalChanges} zmian w {entries.length} produktach
      </p>
      {entries.map((entry) => (
        <div key={entry.sku} className="rounded-lg border border-border/50 p-4">
          <p className="font-mono text-xs font-semibold mb-3">{entry.sku}</p>
          <div className="space-y-2">
            {entry.fields.map((field) => {
              const bc = badgeConfig[field.type];
              return (
                <div key={field.field} className="flex flex-wrap items-start gap-x-2 gap-y-1 text-xs py-1.5 border-b border-border/20 last:border-0">
                  <span className="text-muted-foreground font-medium w-[70px] shrink-0">{field.field}</span>
                  <div className="flex flex-wrap items-start gap-1 min-w-0 flex-1">
                    {field.type !== "unchanged" && (
                      <>
                        <span className="font-mono text-muted-foreground line-through break-all">{field.before}</span>
                        <span className="text-muted-foreground">&rarr;</span>
                      </>
                    )}
                    <span className="font-mono break-all">{field.after}</span>
                    <span className="text-[10px] text-muted-foreground">({field.reason})</span>
                  </div>
                  <Badge variant="outline" className={`text-[10px] shrink-0 ${bc.className}`}>
                    {bc.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
