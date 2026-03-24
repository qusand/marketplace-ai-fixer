import type { OpisFormat, StanStatus } from "./types";

// ─── Color normalization ─────────────────────────────────────────────

const COLOR_MAP: Record<string, string> = {
  "j. szary": "jasnoszary",
  "c. szary": "ciemnoszary",
  "c_szary": "ciemnoszary",
  "beż": "beżowy",
  "czarny": "czarny",
  "biały": "biały",
  "brązowy": "brązowy",
  "czerwony": "czerwony",
  "niebieski": "niebieski",
  "zielony": "zielony",
  "różowy": "różowy",
  "fioletowy": "fioletowy",
};

export function normalizeColor(nazwaOrg: string): string | null {
  const lower = nazwaOrg.toLowerCase();

  // Check all known patterns, longest first to avoid partial matches
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

export function extractDimensions(nazwaOrg: string): {
  szerokosc_cm: number | null;
  dlugosc_cm: number | null;
  wymiary_display: string | null;
} {
  // Match patterns like 040*060cm, 050*080cm, 40x60cm, 40*60 cm
  const match = nazwaOrg.match(/(\d{2,3})\s*[*xX×]\s*(\d{2,3})\s*cm/i);
  if (!match) {
    return { szerokosc_cm: null, dlugosc_cm: null, wymiary_display: null };
  }

  const szerokosc = parseInt(match[1], 10);
  const dlugosc = parseInt(match[2], 10);

  return {
    szerokosc_cm: szerokosc,
    dlugosc_cm: dlugosc,
    wymiary_display: `${szerokosc} x ${dlugosc} cm`,
  };
}

// ─── Price normalization ─────────────────────────────────────────────

export function normalizePrice(raw: string): {
  cena_wartosc: string | null;
  waluta: string | null;
} {
  if (!raw || raw.trim() === "") {
    return { cena_wartosc: null, waluta: null };
  }

  let cleaned = raw.trim();

  // Remove currency suffix
  cleaned = cleaned.replace(/\s*PLN\s*$/i, "").trim();

  // Replace comma with dot
  cleaned = cleaned.replace(",", ".");

  // Parse and format to 2 decimal places
  const num = parseFloat(cleaned);
  if (isNaN(num)) {
    return { cena_wartosc: null, waluta: null };
  }

  return {
    cena_wartosc: num.toFixed(2),
    waluta: "PLN",
  };
}

// ─── Stock normalization ─────────────────────────────────────────────

export function normalizeStock(raw: number | string): {
  stan_wartosc: number | null;
  stan_status: StanStatus;
} {
  if (raw === null || raw === undefined || raw === "") {
    return { stan_wartosc: null, stan_status: "empty" };
  }

  if (typeof raw === "number") {
    // 0 is a valid stock value (out of stock), not empty
    return { stan_wartosc: raw, stan_status: "exact" };
  }

  // Try parsing string as integer
  const parsed = parseInt(raw, 10);
  if (!isNaN(parsed) && String(parsed) === raw.trim()) {
    return { stan_wartosc: parsed, stan_status: "exact" };
  }

  // Non-numeric string like "dużo"
  return { stan_wartosc: null, stan_status: "non_exact" };
}

// ─── Description cleaning ────────────────────────────────────────────

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "") // Remove tags
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim();
}

function extractFromJson(jsonStr: string): string {
  const parsed = JSON.parse(jsonStr);
  const texts: string[] = [];

  if (parsed.sections && Array.isArray(parsed.sections)) {
    for (const section of parsed.sections) {
      if (section.items && Array.isArray(section.items)) {
        for (const item of section.items) {
          if (item.type === "TEXT" && item.content) {
            texts.push(item.content);
          }
        }
      }
    }
  }

  return texts.join(" ").replace(/\s+/g, " ").trim();
}

function detectFormat(raw: string): OpisFormat {
  const trimmed = raw.trim();

  // Check for HTML tags
  if (/<[a-zA-Z][^>]*>/.test(trimmed)) {
    return "html";
  }

  // Check for JSON
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      JSON.parse(trimmed);
      return "json-string";
    } catch {
      // Not valid JSON, treat as plain
    }
  }

  return "plain";
}

export function cleanDescription(raw: string): {
  text: string;
  format: OpisFormat;
} {
  if (!raw || raw.trim() === "") {
    return { text: "", format: "plain" };
  }

  const format = detectFormat(raw);

  switch (format) {
    case "html":
      return { text: stripHtml(raw), format };
    case "json-string":
      return { text: extractFromJson(raw), format };
    case "plain":
      return { text: raw.replace(/\s+/g, " ").trim(), format };
  }
}
