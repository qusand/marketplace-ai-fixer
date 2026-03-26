# Marketplace AI-Fixer

Interaktywny dashboard do automatycznego czyszczenia, normalizacji i walidacji brudnych danych produktowych z eksportów marketplace'ów. Wrzuć plik JSON — dostaniesz oczyszczone dane, gotowe tytuły Allegro i eksport do Excel.

**Live demo:** [marketplace-ai-fixer.vercel.app](https://marketplace-ai-fixer.vercel.app)

## Problem

Partnerskie eksporty produktów zawierają niespójne formaty cen (`"59.90 PLN"` vs `"59,90"`), opisy w trzech formatach (HTML, zagnieżdżony JSON, plain text), brakujące lub błędne kody EAN, oraz niestandardowe parametry (wymiary z gwiazdkami, skrócone nazwy kolorów). Ręczne czyszczenie to godziny pracy i gwarancja błędów.

## Rozwiązanie

Dashboard czyszczący dane w przeglądarce — zero backendu, zero wysyłania danych na serwer.

### Pipeline czyszczenia

| Pole | Transformacja | Przykład |
|------|--------------|---------|
| Wymiary | Parsowanie niestandardowych formatów | `040*060cm` → `40 x 60 cm` |
| Kolory | Rozwijanie skrótów | `j. szary` → `jasnoszary` |
| Ceny | Normalizacja + ekstrakcja waluty | `"59,90 PLN"` → `59.90` + `PLN` |
| Opisy | Strip HTML, parsowanie JSON sections | HTML/JSON/plain → czysty tekst |
| Stany mag. | Klasyfikacja wartości | `15` → exact, `"dużo"` → non_exact |
| EAN | Walidacja checksumy EAN-13 | Status: valid / checksum_invalid / missing |
| Materiał | Ekstrakcja z opisu | `"100% bawełna"` → `bawełna` |

### Generowanie tytułów Allegro

Tytuły budowane dynamicznie z danych produktowych — kategoria, marka, kolor, wymiary, cechy i materiał. Maksymalnie 75 znaków, zoptymalizowane pod SEO marketplace'ów. Obsługa dowolnych produktów (nie tylko jednej kategorii).

### Dual-design UI

Dashboard oferuje dwa tryby wizualne z przełącznikiem w headerze:

- **Classic** — standardowy shadcn/ui z kartami, separatorami i kolorowymi akcentami
- **Linear** — minimalistyczny design inspirowany Linear.app: nested containers z legend-style labels, monochromatyczna paleta, cienkie bordery

Preferencja zapisywana w localStorage. Przełączanie z animacją crossfade (700ms).

### Light / Dark mode

Płynne przejście między motywami z użyciem View Transitions API (500ms cross-fade na poziomie kompozytora GPU). Fallback dla starszych przeglądarek: dwufazowa animacja opacity.

## Funkcjonalności

- **Drag & drop** — przeciągnij plik JSON na dashboard, dane ładują się natychmiast
- **Interaktywna tabela** — klikalny wiersz rozwija panel szczegółów z zakładkami
- **4 widoki danych** — Po czyszczeniu, Dane surowe, Porównanie (before/after), Historia zmian
- **Eksport** — Excel (.xlsx z formatowaniem warunkowym), CSV (z BOM dla polskich znaków), JSON
- **Karty statusowe** — podsumowanie: ile produktów, ile zmian, problemy z EAN, stany magazynowe
- **Responsywność** — pełna obsługa mobile z flex-wrap i break-all na długich wartościach
- **Podgląd Allegro** — symulacja wyglądu oferty na Allegro

## Tech Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI) · ExcelJS · Vercel

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
│   ├── page.tsx                    # Strona główna — dashboard
│   ├── layout.tsx                  # Root layout z providerami (Theme, Design, Tooltip)
│   └── globals.css                 # Zmienne CSS (oklch), design-linear overrides, animacje
│
├── components/dashboard/
│   ├── dashboard.tsx               # Główny layout — dual-design (classic / linear)
│   ├── header.tsx                  # Header z drag & drop, toggle design/theme
│   ├── product-table.tsx           # Tabela produktów z rozwijalnymi wierszami
│   ├── product-detail-expanded.tsx # Panel szczegółów z zakładkami i porównaniem
│   ├── before-after-tabs.tsx       # Zakładki: Po czyszczeniu / Surowe / Porównanie / Historia
│   ├── status-cards.tsx            # Karty statusowe (produkty, zmiany, EAN, stock)
│   ├── change-history.tsx          # Log zmian per produkt z badge'ami typu zmiany
│   ├── allegro-preview.tsx         # Podgląd oferty Allegro
│   ├── export-buttons.tsx          # Eksport Excel / CSV / JSON
│   ├── ean-badge.tsx               # Badge statusu EAN z tooltipem
│   ├── stock-badge.tsx             # Badge statusu stanu magazynowego
│   ├── design-provider.tsx         # Context + localStorage dla dual-design
│   ├── design-toggle.tsx           # Przycisk przełączania classic ↔ linear
│   ├── theme-provider.tsx          # next-themes wrapper
│   └── theme-toggle.tsx            # Przycisk light ↔ dark z View Transitions API
│
├── components/ui/                  # shadcn/ui (Base UI primitives)
│
└── lib/
    ├── pipeline.ts                 # Pipeline czyszczenia + generowanie tytułów Allegro
    ├── parsers.ts                  # Parsery: kolory, wymiary, ceny, opisy, materiały
    ├── validators.ts               # Walidacja EAN-13 checksum
    ├── types.ts                    # Typy TypeScript (CleanProduct, ChangeLogEntry, etc.)
    └── utils.ts                    # cn() utility (clsx + tailwind-merge)
```
