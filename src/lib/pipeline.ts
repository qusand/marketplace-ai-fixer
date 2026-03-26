import type { RawProduct, CleanProduct, ChangeLogEntry, ChangeLogField } from "./types";
import {
  extractColor,
  extractDimensions,
  normalizePrice,
  normalizeStock,
  cleanDescription,
  extractMaterial,
  COLOR_MAP,
} from "./parsers";
import { validateEan } from "./validators";

/**
 * Generate an Allegro-optimized title for a product.
 *
 * ──────────────────────────────────────────────────────────────────────
 * TITLE STRATEGY — based on live Allegro market research (2026-03-26)
 * ──────────────────────────────────────────────────────────────────────
 *
 * Research method:
 * Used Claude Code with the Claude-in-Chrome browser extension to scan
 * live Allegro listings for "dywanik łazienkowy Belweder" and generic
 * "dywanik łazienkowy 40x60". Analyzed ~20 top-selling competitor titles
 * to extract patterns from the highest-converting listings.
 *
 * Key findings from competitor analysis:
 *
 * 1. "Belweder" IS a recognized product line (e-floor brand) — top listings
 *    have 50+ reviews and "17 osób kupiło ostatnio". Keeping it in the title.
 *
 * 2. Best-sellers include "pleciony" (woven) — it's a key differentiator.
 *    Example: "Dywanik łazienkowy Belweder pleciony beżowy 40x60cm" (51 reviews)
 *
 * 3. Top listings use lowercase, not Title Case. "Dywanik łazienkowy" not
 *    "Dywanik Łazienkowy" — Title Case looks auto-generated.
 *
 * 4. Feature keywords appear in almost every top title:
 *    - "antypoślizgowy" in 5/6 top results
 *    - "chłonny" in 2/6
 *    - "do prania" in 2/6
 *
 * 5. Material matters: real Belweders are "bawełna", include when present.
 *
 * 6. Our previous titles used only ~40/75 chars. Competitors use 55-70.
 *    More keywords = more search visibility.
 *
 * Title structure (post-research):
 *   Dywanik łazienkowy Belweder [type] [color] [dims] [features] [material]
 *
 * Rules:
 * - Max 75 characters
 * - Every attribute must trace to this SKU's source data
 * - Lowercase (sentence case) — matches market convention
 * - No keyword stuffing / redundancy
 * ──────────────────────────────────────────────────────────────────────
 */
export function generateAllegroTitle(product: {
  kolor: string | null;
  wymiary_display: string | null;
  opis_czysty: string;
}): string {
  const { kolor, wymiary_display, opis_czysty } = product;
  const lower = opis_czysty.toLowerCase();

  // Extract product type descriptor from description
  const type = lower.includes("plecion") ? "pleciony" : null;

  // Extract features — ordered by search frequency on Allegro (from research)
  const features: string[] = [];
  if (lower.includes("antypoślizgowy") || lower.includes("antypoślizg"))
    features.push("antypoślizgowy");
  if (lower.includes("chłonny") || lower.includes("chłonn"))
    features.push("chłonny");
  if (lower.includes("miękki") || lower.includes("miękk"))
    features.push("miękki");
  if (lower.includes("do prania") || lower.includes("pralce"))
    features.push("do prania");
  if (/gramatura\s*\d+/i.test(lower)) {
    const gramMatch = lower.match(/gramatura\s*(\d+)/i);
    if (gramMatch) features.push(`${gramMatch[1]}g/m²`);
  }

  // Extract material for title suffix
  let material: string | null = null;
  if (lower.includes("bawełn") || lower.includes("100% bawełna"))
    material = "bawełna";
  else if (lower.includes("100% poliester") || lower.includes("100% pes"))
    material = "poliester";

  // Build title: Dywanik łazienkowy Belweder [type] [color] [dims] [features] [material]
  const parts = ["Dywanik łazienkowy Belweder"];

  if (type) parts.push(type);
  if (kolor) parts.push(kolor);

  if (wymiary_display) {
    parts.push(wymiary_display.replace(/\s*x\s*/, "x"));
  }

  // Add features until we approach 75 chars, leaving room for material
  let title = parts.join(" ");
  for (const feat of features) {
    const candidate = title + " " + feat;
    if (candidate.length <= 70) {
      title = candidate;
    }
  }

  // Add material as last element if there's room
  if (material) {
    const candidate = title + " " + material;
    if (candidate.length <= 75) {
      title = candidate;
    }
  }

  // Final safety: truncate to 75
  if (title.length > 75) {
    title = title.substring(0, 75).trim();
  }

  return title;
}

/**
 * Main pipeline: transforms raw products into clean products.
 * All records go through the same code path — no per-record exceptions.
 */
export function processProducts(raw: RawProduct[]): CleanProduct[] {
  return raw.map((product) => {
    const kolor = extractColor(product["NAZWA ORG"]);
    const dims = extractDimensions(product["NAZWA ORG"]);
    const price = normalizePrice(product.Cena);
    const desc = cleanDescription(product["Opis ofe"]);
    const material = extractMaterial(desc.opis_czysty);
    const stock = normalizeStock(product.Stany);
    const ean = validateEan(product.EAN);

    const tytul_allegro = generateAllegroTitle({
      kolor,
      wymiary_display: dims.wymiary_display,
      opis_czysty: desc.opis_czysty,
    });

    return {
      sku: product.SKU,
      nazwa_org: product["NAZWA ORG"],
      kolor,
      ...dims,
      ...price,
      ...desc,
      ...stock,
      ...ean,
      tytul_allegro,
      material,
    };
  });
}

/**
 * Generate a per-field changelog comparing raw vs clean data.
 * Polish descriptions for each change type.
 */
export function generateChangeLog(
  raw: RawProduct[],
  clean: CleanProduct[]
): ChangeLogEntry[] {
  return raw.map((r, i) => {
    const c = clean[i];
    const fields: ChangeLogField[] = [];

    // Color
    const colorAbbrevs = Object.keys(COLOR_MAP);
    const rawLower = r["NAZWA ORG"].toLowerCase();
    const rawColor =
      colorAbbrevs.find((abbr) => rawLower.includes(abbr)) ?? "—";
    fields.push({
      field: "Kolor",
      before: rawColor,
      after: c.kolor ?? "—",
      type: rawColor !== (c.kolor ?? "—") ? "changed" : "unchanged",
      reason:
        rawColor !== (c.kolor ?? "—")
          ? "Normalizacja skrótu koloru"
          : "Bez zmian",
    });

    // Dimensions
    const rawDims =
      r["NAZWA ORG"].match(/\d{2,3}\s*[*xX]\s*\d{2,3}\s*cm/i)?.[0] ?? "—";
    fields.push({
      field: "Wymiary",
      before: rawDims,
      after: c.wymiary_display ?? "—",
      type: rawDims !== (c.wymiary_display ?? "—") ? "changed" : "unchanged",
      reason:
        rawDims !== (c.wymiary_display ?? "—")
          ? "Usunięto wiodące zera, normalizacja formatu"
          : "Bez zmian",
    });

    // Price
    fields.push({
      field: "Cena",
      before: r.Cena,
      after: c.cena_wartosc ? `${c.cena_wartosc} ${c.waluta}` : "—",
      type:
        r.Cena !== `${c.cena_wartosc} ${c.waluta}` ? "changed" : "unchanged",
      reason: r.Cena.includes(",")
        ? "Zamiana przecinka na kropkę"
        : r.Cena.includes("PLN")
          ? "Normalizacja formatu"
          : "Bez zmian",
    });

    // Description
    fields.push({
      field: "Opis",
      before:
        c.opis_format === "html"
          ? "HTML"
          : c.opis_format === "json-string"
            ? "JSON"
            : "Tekst",
      after: "Czysty tekst",
      type: c.opis_format !== "plain" ? "changed" : "unchanged",
      reason:
        c.opis_format === "html"
          ? "Usunięto tagi HTML"
          : c.opis_format === "json-string"
            ? "Wyciągnięto tekst z JSON sections"
            : "Bez zmian",
    });

    // Stock
    fields.push({
      field: "Stan",
      before: String(r.Stany),
      after:
        c.stan_status === "exact" ? String(c.stan_wartosc) : c.stan_status,
      type: c.stan_status === "non_exact" ? "problem" : "unchanged",
      reason:
        c.stan_status === "non_exact"
          ? `Wartość "${r.Stany}" nie jest liczbą`
          : "Wartość liczbowa OK",
    });

    // EAN
    fields.push({
      field: "EAN",
      before: r.EAN || "(pusty)",
      after: `${c.ean_raw ?? "—"} [${c.ean_status}]`,
      type: c.ean_status !== "valid" ? "problem" : "unchanged",
      reason:
        c.ean_status === "missing"
          ? "Brak kodu EAN"
          : c.ean_status === "non_numeric"
            ? "Zawiera znaki niebędące cyframi"
            : c.ean_status === "checksum_invalid"
              ? "Checksum EAN-13 niepoprawny"
              : "EAN-13 poprawny",
    });

    return { sku: c.sku, fields };
  });
}
