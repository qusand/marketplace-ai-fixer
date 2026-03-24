"use client";

import { Package } from "lucide-react";
import { EanBadge } from "./ean-badge";
import type { CleanProduct } from "@/lib/types";

export function AllegroPreview({ product }: { product: CleanProduct }) {
  return (
    <div className="bg-white text-slate-900 rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Image placeholder */}
      <div className="bg-slate-100 h-48 flex items-center justify-center border-b border-slate-200">
        <Package className="h-12 w-12 text-slate-300" />
      </div>

      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-[15px] font-semibold leading-snug text-slate-900">
          {product.tytul_allegro}
        </h3>
        <p className="text-[10px] text-slate-400">
          {product.tytul_allegro.length}/75 znaków
        </p>

        {/* Price + stock */}
        <div className="flex items-baseline justify-between">
          <span className="text-xl font-bold text-slate-900">
            {product.cena_wartosc ? `${product.cena_wartosc} zł` : "—"}
          </span>
          <span className="text-xs text-slate-500">
            {product.stan_status === "exact"
              ? product.stan_wartosc === 0
                ? "Brak w magazynie"
                : `Dostępne: ${product.stan_wartosc} szt.`
              : "Stan nieznany"}
          </span>
        </div>

        {/* Separator */}
        <hr className="border-slate-200" />

        {/* Parameters */}
        <div>
          <h4 className="text-xs font-semibold text-slate-700 mb-2">Parametry</h4>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
            {product.kolor && (
              <>
                <dt className="text-slate-500">Kolor</dt>
                <dd className="text-slate-900 capitalize">{product.kolor}</dd>
              </>
            )}
            {product.wymiary_display && (
              <>
                <dt className="text-slate-500">Wymiary</dt>
                <dd className="text-slate-900">{product.wymiary_display}</dd>
              </>
            )}
            {product.material && (
              <>
                <dt className="text-slate-500">Materiał</dt>
                <dd className="text-slate-900">{product.material}</dd>
              </>
            )}
          </dl>
        </div>

        {/* Separator */}
        <hr className="border-slate-200" />

        {/* Description */}
        <div>
          <h4 className="text-xs font-semibold text-slate-700 mb-1">Opis</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {product.opis_czysty}
          </p>
        </div>

        {/* EAN */}
        {product.ean_raw && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] text-slate-400">EAN:</span>
            <span className="text-[11px] font-mono text-slate-600">{product.ean_raw}</span>
            <EanBadge status={product.ean_status} />
          </div>
        )}
      </div>
    </div>
  );
}
