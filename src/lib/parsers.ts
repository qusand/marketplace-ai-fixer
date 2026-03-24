import type { OpisFormat, StanStatus } from "./types";

// ─── Color normalization ─────────────────────────────────────────────

export const COLOR_MAP: Record<string, string> = {
  "j. szary": "jasnoszary",
  "c. szary": "ciemnoszary",
  c_szary: "ciemnoszary",
  "j. niebieski": "jasnoniebieski",
  "c. niebieski": "ciemnoniebieski",
  beż: "beżowy",
  czarny: "czarny",
  biały: "biały",
  szary: "szary",
  brązowy: "brązowy",
  czerwony: "czerwony",
  zielony: "zielony",
  niebieski: "niebieski",
  granatowy: "granatowy",
  kremowy: "kremowy",
  różowy: "różowy",
  fioletowy: "fioletowy",
};

export function extractColor(name: string): string | null {
  const lower = name.toLowerCase();
  // Try longest matches first to avoid partial matching
  const sortedKeys = Object.keys(COLOR_MAP).sort(
    (a, b) => b.length - a.length
  );
  for (const key of sortedKeys) {
    if (lower.includes(key)) {
      return COLOR_MAP[key];
    }
  }
  return null;
}

// ─── Dimension extraction ────────────────────────────────────────────

export function extractDimensions(name: string): {
  szerokosc_cm: number | null;
  dlugosc_cm: number | null;
  wymiary_display: string | null;
} {
  // Match patterns like 040*060cm, 050*080cm, 40x60cm, etc.
  const match = name.match(/(\d{2,3})\s*[*xX×]\s*(\d{2,3})\s*cm/i);
  if (!match) {
    return { szerokosc_cm: null, dlugosc_cm: null, wymiary_display: null };
  }

  // Remove leading zeros: 040 → 40
  const width = parseInt(match[1], 10);
  const length = parseInt(match[2], 10);

  return {
    szerokosc_cm: width,
    dlugosc_cm: length,
    wymiary_display: `${width} x ${length} cm`,
  };
}

// ─── Price normalization ─────────────────────────────────────────────

export function normalizePrice(raw: string): {
  cena_wartosc: string | null;
  waluta: string | null;
} {
  if (!raw || !raw.trim()) {
    return { cena_wartosc: null, waluta: null };
  }

  let cleaned = raw.trim();
  // Anchored PLN regex — only removes PLN at the end (from rekrutacja)
  cleaned = cleaned.replace(/\s*PLN\s*$/i, "").trim();
  // Replace comma with dot
  cleaned = cleaned.replace(",", ".");

  const num = parseFloat(cleaned);
  if (isNaN(num)) {
    return { cena_wartosc: null, waluta: null };
  }

  return {
    cena_wartosc: num.toFixed(2),
    waluta: "PLN",
  };
}

// ─── Description cleaning ────────────────────────────────────────────

function stripHtml(html: string): string {
  // Decode entities FIRST so encoded tags become real tags,
  // then strip all tags — prevents XSS via entity-encoded payloads (from rekrutacja)
  let text = html
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  text = text.replace(/<[^>]*>/g, " ");
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1") // Punctuation cleanup (from zadanie)
    .trim();
}

function extractFromJsonString(jsonStr: string): string {
  try {
    const parsed = JSON.parse(jsonStr);
    // Strict JSON detection: must have .sections array (from zadanie)
    if (parsed.sections && Array.isArray(parsed.sections)) {
      const texts: string[] = [];
      for (const section of parsed.sections) {
        if (section.items && Array.isArray(section.items)) {
          for (const item of section.items) {
            if (item.type === "TEXT" && item.content) {
              texts.push(item.content.trim());
            }
          }
        }
      }
      return texts.join(" ").replace(/\s+/g, " ").trim();
    }
    return JSON.stringify(parsed);
  } catch {
    return jsonStr.trim();
  }
}

function detectOpisFormat(raw: string): OpisFormat {
  const trimmed = raw.trim();
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return "html";
  }
  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed === "object" && parsed !== null && parsed.sections) {
      return "json-string";
    }
  } catch {
    // Not JSON
  }
  return "plain";
}

export function cleanDescription(raw: string): {
  opis_czysty: string;
  opis_format: OpisFormat;
} {
  const format = detectOpisFormat(raw);
  let clean: string;

  switch (format) {
    case "html":
      clean = stripHtml(raw);
      break;
    case "json-string":
      clean = extractFromJsonString(raw);
      break;
    case "plain":
    default:
      clean = raw.replace(/\s+/g, " ").trim();
      break;
  }

  return { opis_czysty: clean, opis_format: format };
}

// ─── Stock normalization ─────────────────────────────────────────────

export function normalizeStock(raw: number | string | null | undefined): {
  stan_wartosc: number | null;
  stan_status: StanStatus;
} {
  if (raw === null || raw === undefined || raw === "") {
    return { stan_wartosc: null, stan_status: "empty" };
  }

  if (typeof raw === "number") {
    return { stan_wartosc: raw, stan_status: "exact" };
  }

  const parsed = parseInt(String(raw), 10);
  if (!isNaN(parsed) && String(parsed) === String(raw).trim()) {
    return { stan_wartosc: parsed, stan_status: "exact" };
  }

  return { stan_wartosc: null, stan_status: "non_exact" };
}

// ─── Material extraction (from zadanie) ──────────────────────────────

export function extractMaterial(description: string): string | null {
  const patterns = [
    /100%\s+(poliester|bawełna|PES|nylon|akryl|wiskoza)/i,
    /materiał[:\s]+([\w%\s]+?)(?:\.|,|$)/i,
    /skład[:\s]+([\w%\s]+?)(?:\.|,|$)/i,
  ];
  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match) return match[1].trim();
  }
  return null;
}
