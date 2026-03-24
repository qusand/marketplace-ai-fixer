"use client";

import { useState, useCallback, useRef } from "react";
import { Upload } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { ExportButtons } from "./export-buttons";
import { processProducts } from "@/lib/pipeline";
import type { RawProduct, CleanProduct } from "@/lib/types";

type Props = {
  products: CleanProduct[];
  onDataUpdate: (raw: RawProduct[], clean: CleanProduct[]) => void;
};

export function Header({ products, onDataUpdate }: Props) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dragCounter = useRef(0);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (!file || !file.name.endsWith(".json")) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("Plik musi zawierać niepustą tablicę produktów");
      }
      const requiredFields = ["NAZWA ORG", "SKU", "Cena", "Opis ofe", "Stany", "EAN"];
      const missingFields = requiredFields.filter(f => !(f in parsed[0]));
      if (missingFields.length > 0) {
        throw new Error(`Brakujące pola: ${missingFields.join(", ")}`);
      }
      const cleaned = processProducts(parsed as RawProduct[]);
      onDataUpdate(parsed as RawProduct[], cleaned);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nieprawidłowy format JSON");
      setTimeout(() => setError(null), 4000);
    }
  }, [onDataUpdate]);

  return (
    <header
      className={`border-b transition-colors duration-150 ${
        isDragOver
          ? "border-2 border-dashed border-primary bg-primary/5"
          : "border-border/50"
      }`}
      onDragOver={(e) => { e.preventDefault(); }}
      onDragEnter={(e) => { e.preventDefault(); dragCounter.current++; setIsDragOver(true); }}
      onDragLeave={() => { dragCounter.current--; if (dragCounter.current === 0) setIsDragOver(false); }}
      onDrop={(e) => { dragCounter.current = 0; handleDrop(e); }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Marketplace AI-Fixer
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Czyszczenie i normalizacja danych produktowych
            </p>
          </div>

          {isDragOver ? (
            <div className="flex items-center gap-2 text-primary">
              <Upload className="h-5 w-5" />
              <span className="text-sm font-medium">Upuść plik JSON</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground/50">
              <Upload className="h-3.5 w-3.5" />
              <span className="text-[11px] hidden sm:inline">lub przeciągnij plik JSON</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ExportButtons products={products} />
          </div>
        </div>

        {error && (
          <div className="mt-2 text-xs text-destructive bg-destructive/10 rounded-md px-3 py-1.5">
            {error}
          </div>
        )}
      </div>
    </header>
  );
}
