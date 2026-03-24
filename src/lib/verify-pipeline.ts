/**
 * Verification script: runs pipeline and checks output against
 * spec section 6 reference table.
 *
 * Usage: npx tsx src/lib/verify-pipeline.ts
 */

import { cleanProducts } from "./pipeline";
import type { RawProduct } from "./types";
import rawData from "../data/partner_export_dirty.json";

const results = cleanProducts(rawData as RawProduct[]);

let pass = 0;
let fail = 0;

function check(label: string, actual: unknown, expected: unknown) {
  if (actual === expected) {
    console.log(`  ✓ ${label}: ${JSON.stringify(actual)}`);
    pass++;
  } else {
    console.error(
      `  ✗ ${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
    fail++;
  }
}

console.log(`\nPipeline produced ${results.length} records.\n`);

// ─── BEL-4060-BLK ────────────────────────────────────────────────────
const r0 = results.find((r) => r.sku === "BEL-4060-BLK")!;
console.log("BEL-4060-BLK:");
check("kolor", r0.kolor, "czarny");
check("wymiary_display", r0.wymiary_display, "40 x 60 cm");
check("szerokosc_cm", r0.szerokosc_cm, 40);
check("dlugosc_cm", r0.dlugosc_cm, 60);
check("cena_wartosc", r0.cena_wartosc, "59.90");
check("opis_format", r0.opis_format, "html");
check("stan_wartosc", r0.stan_wartosc, 15);
check("stan_status", r0.stan_status, "exact");
check("ean_status", r0.ean_status, "checksum_invalid");
check("title ≤75", r0.tytul_allegro.length <= 75, true);
console.log(`  Title: "${r0.tytul_allegro}" (${r0.tytul_allegro.length} chars)`);
console.log(`  Description: "${r0.opis_czysty}"`);

// ─── BEL-4060-GRY-L ──────────────────────────────────────────────────
const r1 = results.find((r) => r.sku === "BEL-4060-GRY-L")!;
console.log("\nBEL-4060-GRY-L:");
check("kolor", r1.kolor, "jasnoszary");
check("wymiary_display", r1.wymiary_display, "40 x 60 cm");
check("cena_wartosc", r1.cena_wartosc, "59.90");
check("opis_format", r1.opis_format, "json-string");
check("stan_wartosc", r1.stan_wartosc, null);
check("stan_status", r1.stan_status, "non_exact");
check("ean_status", r1.ean_status, "checksum_invalid");
check("title ≤75", r1.tytul_allegro.length <= 75, true);
console.log(`  Title: "${r1.tytul_allegro}" (${r1.tytul_allegro.length} chars)`);
console.log(`  Description: "${r1.opis_czysty}"`);

// ─── BEL-5080-BEG ────────────────────────────────────────────────────
const r2 = results.find((r) => r.sku === "BEL-5080-BEG")!;
console.log("\nBEL-5080-BEG:");
check("kolor", r2.kolor, "beżowy");
check("wymiary_display", r2.wymiary_display, "50 x 80 cm");
check("cena_wartosc", r2.cena_wartosc, "75.00");
check("opis_format", r2.opis_format, "plain");
check("stan_wartosc", r2.stan_wartosc, 0);
check("stan_status", r2.stan_status, "exact");
check("ean_status", r2.ean_status, "missing");
check("title ≤75", r2.tytul_allegro.length <= 75, true);
console.log(`  Title: "${r2.tytul_allegro}" (${r2.tytul_allegro.length} chars)`);
console.log(`  Description: "${r2.opis_czysty}"`);

// ─── BEL-5080-GRY-D ──────────────────────────────────────────────────
const r3 = results.find((r) => r.sku === "BEL-5080-GRY-D")!;
console.log("\nBEL-5080-GRY-D:");
check("kolor", r3.kolor, "ciemnoszary");
check("wymiary_display", r3.wymiary_display, "50 x 80 cm");
check("cena_wartosc", r3.cena_wartosc, "75.00");
check("opis_format", r3.opis_format, "json-string");
check("stan_wartosc", r3.stan_wartosc, 3);
check("stan_status", r3.stan_status, "exact");
check("ean_status", r3.ean_status, "non_numeric");
check("title ≤75", r3.tytul_allegro.length <= 75, true);
console.log(`  Title: "${r3.tytul_allegro}" (${r3.tytul_allegro.length} chars)`);
console.log(`  Description: "${r3.opis_czysty}"`);

// ─── Summary ──────────────────────────────────────────────────────────
console.log(`\n${"═".repeat(50)}`);
console.log(`Results: ${pass} passed, ${fail} failed out of ${pass + fail}`);
if (fail === 0) {
  console.log("✓ ALL CHECKS PASSED");
} else {
  console.log("✗ SOME CHECKS FAILED");
  process.exit(1);
}
