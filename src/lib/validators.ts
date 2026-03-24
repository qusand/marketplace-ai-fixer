import type { EanStatus } from "./types";

/**
 * Validate an EAN-13 barcode.
 *
 * EAN-13 checksum algorithm:
 * 1. Take first 12 digits
 * 2. Multiply alternately by 1 and 3
 * 3. Sum all products
 * 4. Check digit = (10 - (sum % 10)) % 10
 * 5. Compare with the 13th digit
 */
export function validateEan13(ean: string | null | undefined): EanStatus {
  // Empty or null
  if (!ean || ean.trim() === "") {
    return "missing";
  }

  const trimmed = ean.trim();

  // Contains non-digit characters
  if (!/^\d+$/.test(trimmed)) {
    return "non_numeric";
  }

  // Must be exactly 13 digits for EAN-13
  if (trimmed.length !== 13) {
    return "checksum_invalid"; // Wrong length
  }

  // Calculate checksum
  const digits = trimmed.split("").map(Number);
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * (i % 2 === 0 ? 1 : 3);
  }
  const checkDigit = (10 - (sum % 10)) % 10;

  if (checkDigit === digits[12]) {
    return "valid";
  }

  return "checksum_invalid";
}
