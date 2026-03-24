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
                <div key={field.field} className="grid grid-cols-[80px_1fr_auto] items-start gap-2 text-xs">
                  <span className="text-muted-foreground font-medium">{field.field}</span>
                  <div className="flex items-start gap-1.5">
                    {field.type !== "unchanged" && (
                      <>
                        <span className="font-mono text-muted-foreground line-through">{field.before}</span>
                        <span className="text-muted-foreground">&rarr;</span>
                      </>
                    )}
                    <span className="font-mono">{field.after}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">({field.reason})</span>
                  </div>
                  <Badge variant="outline" className={`text-[10px] ${bc.className}`}>
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
