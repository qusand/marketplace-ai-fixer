# Marketplace AI-Fixer

Narzędzie do automatycznego czyszczenia i normalizacji brudnych danych produktowych z eksportów partnerskich.

## Problem

Partnerskie eksporty produktów zawierają niespójne formaty cen (`"59.90 PLN"` vs `"59,90"`), opisy w trzech różnych formatach (HTML, zagnieżdżony JSON, plain text), brakujące lub błędne kody EAN, oraz niestandardowe parametry (wymiary z gwiazdkami, skrócone nazwy kolorów). Ręczne czyszczenie to godziny pracy i gwarancja błędów.

## Rozwiązanie

- Automatyczna detekcja i czyszczenie 3 formatów opisów (HTML, JSON, plain text)
- Normalizacja wymiarów (`040*060cm` → `40 x 60 cm`), kolorów (`j. szary` → `jasnoszary`), cen
- Walidacja EAN-13 z checksumą — jawne statusy problemów zamiast cichego ukrywania
- Generowanie tytułów Allegro zoptymalizowanych pod SEO (max 75 znaków)
- Eksport do Excel (.xlsx) z formatowaniem warunkowym i CSV z BOM (polskie znaki)
- Panel porównawczy "Przed → Po" z widokiem surowych i oczyszczonych danych

## Tech Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui · ExcelJS

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Aplikacja startuje na `http://localhost:4000`.

## Struktura projektu

```
src/
├── app/
│   ├── page.tsx              # Strona główna — dashboard
│   └── api/export/route.ts   # API endpoint do eksportu Excel/CSV
├── components/dashboard/
│   ├── dashboard.tsx          # Główny layout dashboardu
│   ├── product-table.tsx      # Tabela produktów z klikalnymi wierszami
│   ├── status-cards.tsx       # Karty statusowe (EAN, stany, stock)
│   ├── before-after-tabs.tsx  # Zakładki porównania danych
│   ├── product-detail-sheet.tsx # Panel szczegółów produktu (slide-out)
│   ├── export-buttons.tsx     # Przyciski pobierania Excel/CSV
│   ├── ean-badge.tsx          # Badge statusu EAN z tooltipem
│   └── stock-badge.tsx        # Badge statusu stanu z tooltipem
├── lib/
│   ├── data-processor.ts      # Pipeline czyszczenia danych
│   └── types.ts               # Typy TypeScript
└── data/
    └── partner_export_dirty.json  # Dane wejściowe
```

## Pipeline czyszczenia

| Pole | Transformacja |
|------|--------------|
| Wymiary | `040*060cm` → `40 x 60 cm` (osobne kolumny: szerokość, długość) |
| Kolory | `j. szary` → `jasnoszary`, `c. szary` → `ciemnoszary`, `beż` → `beżowy` |
| Ceny | `"59,90"` / `"59.90 PLN"` → `59.90` + `PLN` |
| Opisy | Strip HTML tags, parsowanie JSON `sections.items`, normalizacja whitespace |
| Stany | `15` → exact, `"dużo"` → non_exact, `0` → exact (brak w magazynie) |
| EAN | Walidacja EAN-13 checksum, detekcja brakujących i nieterminowych wartości |
