"use client";

import { useState, useCallback, useRef } from "react";
import type { RawProduct } from "@/lib/types";
import { UploadIcon } from "lucide-react";

const REQUIRED_KEYS = ["NAZWA ORG", "SKU", "Cena", "Opis ofe", "Stany", "EAN"];

interface DropZoneProps {
  onFileAccepted: (data: RawProduct[], fileName: string) => void;
}

export function DropZone({ onFileAccepted }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcess = useCallback(
    (file: File) => {
      setError(null);

      if (!file.name.endsWith(".json")) {
        setError("Tylko pliki .json");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Plik za duży (max 5 MB)");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const parsed = JSON.parse(text);

          if (!Array.isArray(parsed) || parsed.length === 0) {
            setError("Plik musi zawierać tablicę JSON z co najmniej 1 rekordem");
            return;
          }

          if (parsed.length > 500) {
            setError("Maksymalnie 500 rekordów");
            return;
          }

          // Validate first record has required keys
          const firstRecord = parsed[0];
          const missingKeys = REQUIRED_KEYS.filter(
            (key) => !(key in firstRecord)
          );

          if (missingKeys.length > 0) {
            setError(
              `Brak wymaganych pól: ${missingKeys.join(", ")}`
            );
            return;
          }

          onFileAccepted(parsed as RawProduct[], file.name);
        } catch {
          setError("Nieprawidłowy format JSON");
        }
      };
      reader.readAsText(file);
    },
    [onFileAccepted]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) validateAndProcess(file);
    },
    [validateAndProcess]
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndProcess(file);
      // Reset input so the same file can be re-selected
      e.target.value = "";
    },
    [validateAndProcess]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        relative cursor-pointer rounded-lg border border-dashed px-4 py-3
        transition-colors duration-150
        ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border/60 hover:border-border hover:bg-muted/20"
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileInput}
        className="hidden"
      />
      <div className="flex items-center gap-3">
        <UploadIcon
          className={`h-4 w-4 shrink-0 ${
            isDragging ? "text-primary" : "text-muted-foreground/50"
          }`}
        />
        <p className="text-xs text-muted-foreground">
          {isDragging
            ? "Upuść plik JSON..."
            : "Przeciągnij plik JSON lub kliknij aby wybrać"}
        </p>
        {error && (
          <p className="text-xs text-red-500 dark:text-red-400 ml-auto">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
