export type OpisFormat = "html" | "json-string" | "plain";
export type StanStatus = "exact" | "non_exact" | "empty";
export type EanStatus = "valid" | "missing" | "non_numeric" | "checksum_invalid";

export type RawProduct = {
  "NAZWA ORG": string;
  SKU: string;
  Cena: string;
  "Opis ofe": string;
  Stany: number | string;
  EAN: string;
};

export type ChangeType = "changed" | "unchanged" | "problem";

export type ChangeLogField = {
  field: string;
  before: string;
  after: string;
  type: ChangeType;
  reason: string;
};

export type ChangeLogEntry = {
  sku: string;
  fields: ChangeLogField[];
};

export type CleanProduct = {
  sku: string;
  nazwa_org: string;
  kolor: string | null;
  szerokosc_cm: number | null;
  dlugosc_cm: number | null;
  wymiary_display: string | null;
  cena_wartosc: string | null;
  waluta: string | null;
  opis_czysty: string;
  opis_format: OpisFormat;
  stan_wartosc: number | null;
  stan_status: StanStatus;
  ean_raw: string | null;
  ean_status: EanStatus;
  tytul_allegro: string;
  material: string | null;
};
