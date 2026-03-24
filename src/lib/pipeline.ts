import type { RawProduct, CleanProduct } from "./types";
import {
  normalizeColor,
  extractDimensions,
  normalizePrice,
  normalizeStock,
  cleanDescription,
} from "./parsers";
import { validateEan13 } from "./validators";

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
  nazwa_org: string;
}): string {
  const { kolor, wymiary_display, opis_czysty } = product;
  const desc = opis_czysty.toLowerCase();

  // Extract features from description — only use what's actually there
  const features: string[] = [];

  if (desc.includes("antypoślizgowy") || desc.includes("antypoślizg")) {
    features.push("Antypoślizgowy");
  }
  if (desc.includes("chłonny") || desc.includes("chłonn")) {
    features.push("Chłonny");
  }
  if (desc.includes("100% poliester") || desc.includes("100% pes")) {
    features.push("100% Poliester");
  }
  if (desc.includes("800g") || desc.includes("800 g")) {
    features.push("Premium 800g");
  }
  if (desc.includes("miękki")) {
    features.push("Miękki");
  }

  // Build title parts
  const parts: string[] = ["Dywanik Łazienkowy Belweder"];

  if (kolor) {
    // Capitalize first letter
    parts.push(kolor.charAt(0).toUpperCase() + kolor.slice(1));
  }

  if (wymiary_display) {
    // Convert "40 x 60 cm" → "40x60 cm" for title brevity
    parts.push(wymiary_display.replace(/\s*x\s*/g, "x"));
  }

  // Add features until we hit 75 char limit
  for (const feat of features) {
    const candidate = parts.join(" ") + " " + feat;
    if (candidate.length <= 75) {
      parts.push(feat);
    }
  }

  let title = parts.join(" ");

  // Final safety check
  if (title.length > 75) {
    title = title.substring(0, 75).trim();
  }

  return title;
}

/**
 * Main pipeline: transforms raw products into clean products.
 * All 4 records go through the same code path — no per-record exceptions.
 */
export function cleanProducts(rawData: RawProduct[]): CleanProduct[] {
  return rawData.map((raw) => {
    const dims = extractDimensions(raw["NAZWA ORG"]);
    const kolor = normalizeColor(raw["NAZWA ORG"]);
    const price = normalizePrice(raw.Cena);
    const stock = normalizeStock(raw.Stany);
    const desc = cleanDescription(raw["Opis ofe"]);
    const eanStatus = validateEan13(raw.EAN);

    const partial = {
      kolor,
      wymiary_display: dims.wymiary_display,
      opis_czysty: desc.text,
      nazwa_org: raw["NAZWA ORG"],
    };

    return {
      sku: raw.SKU,
      nazwa_org: raw["NAZWA ORG"],
      kolor,
      szerokosc_cm: dims.szerokosc_cm,
      dlugosc_cm: dims.dlugosc_cm,
      wymiary_display: dims.wymiary_display,
      cena_wartosc: price.cena_wartosc,
      waluta: price.waluta,
      opis_czysty: desc.text,
      opis_format: desc.format,
      stan_wartosc: stock.stan_wartosc,
      stan_status: stock.stan_status,
      ean_raw: raw.EAN || null,
      ean_status: eanStatus,
      tytul_allegro: generateAllegroTitle(partial),
    };
  });
}
