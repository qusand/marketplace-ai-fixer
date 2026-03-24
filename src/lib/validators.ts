import type { EanStatus } from "./types";

// ─── EAN-13 validation ───────────────────────────────────────────────

function validateEan13Checksum(ean: string): boolean {
  if (ean.length !== 13) return false;
  const digits = ean.split("").map(Number);
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * (i % 2 === 0 ? 1 : 3);
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === digits[12];
}

export function validateEan(raw: string): {
  ean_raw: string | null;
  ean_status: EanStatus;
} {
  if (!raw || raw.trim() === "") {
    return { ean_raw: null, ean_status: "missing" };
  }

  const trimmed = raw.trim();

  if (!/^\d+$/.test(trimmed)) {
    return { ean_raw: trimmed, ean_status: "non_numeric" };
  }

  if (validateEan13Checksum(trimmed)) {
    return { ean_raw: trimmed, ean_status: "valid" };
  }

  return { ean_raw: trimmed, ean_status: "checksum_invalid" };
}
