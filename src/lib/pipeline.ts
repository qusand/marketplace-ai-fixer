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
 * Structure (from Allegro SEO research):
 * Base keyword → Type → Brand → Color → Dimensions → Sales hook → Material/param
 *
 * Rules:
 * - Max 75 characters
 * - Every attribute must trace to this SKU's source data
 * - Capitalize first letter of significant words
 * - No keyword stuffing / redundancy
 */
export function generateAllegroTitle(product: {
  kolor: string | null;
  wymiary_display: string | null;
  opis_czysty: string;
}): string {
  const { kolor, wymiary_display, opis_czysty } = product;
  const lower = opis_czysty.toLowerCase();

  // Extract features from description — use stem variants for Polish morphology (from rekrutacja)
  const features: string[] = [];
  if (lower.includes("antypoślizgowy") || lower.includes("antypoślizg"))
    features.push("Antypoślizgowy");
  if (lower.includes("chłonny") || lower.includes("chłonn"))
    features.push("Chłonny");
  if (lower.includes("miękki") || lower.includes("miękk"))
    features.push("Miękki");
  if (lower.includes("100% poliester") || lower.includes("100% pes"))
    features.push("100% Poliester");
  if (/gramatura\s*\d+/i.test(lower)) {
    const gramMatch = lower.match(/gramatura\s*(\d+)/i);
    if (gramMatch) features.push(`${gramMatch[1]}g/m²`);
  }

  // Build title: Dywanik Łazienkowy Belweder [Kolor] [Wymiar] [Feature]
  const parts = ["Dywanik Łazienkowy Belweder"];

  if (kolor) {
    parts.push(kolor.charAt(0).toUpperCase() + kolor.slice(1));
  }

  if (wymiary_display) {
    // Convert "40 x 60 cm" to "40x60 cm" for title brevity
    parts.push(wymiary_display.replace(/\s*x\s*/, "x"));
  }

  // Add features until we hit 75 chars
  let title = parts.join(" ");
  for (const feat of features) {
    const candidate = title + " " + feat;
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
