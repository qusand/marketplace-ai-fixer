# Marketplace AI-Fixer

Narzędzie do automatycznego czyszczenia i normalizacji brudnych danych produktowych z eksportów partnerskich.

## Live Demo

[link do Vercel — zostanie dodany po deployu]

## Problem

Partnerskie eksporty produktów zawierają niespójne formaty cen (`59.90 PLN` vs `59,90`), opisy w surowym HTML/JSON, brakujące lub błędne kody EAN, skrótowe nazwy kolorów (`j. szary`, `beż`) i niestandaryzowane wymiary (`040*060cm`). Ręczne czyszczenie to godziny pracy i gwarancja błędów.

## Rozwiązanie

- **Automatyczna detekcja i czyszczenie 3 formatów opisów** (HTML, zagnieżdżony JSON, plain text)
- **Normalizacja wymiarów** (`040*060cm` → `40 x 60 cm`), **kolorów** (`j. szary` → `jasnoszary`), **cen** (ujednolicony format)
- **Walidacja EAN-13** z checksumą — jawne statusy zamiast cichego ukrywania problemów
- **Generowanie tytułów Allegro** (max 75 znaków, zoptymalizowane pod SEO marketplace)
- **Eksport do Excel** (.xlsx z formatowaniem warunkowym) i **CSV** (UTF-8 BOM, separator `;`)
- **Profesjonalny dashboard** z widokiem przed/po, statusami jakości danych i panelem szczegółów

## Tech Stack

Next.js · Tailwind CSS · shadcn/ui · TypeScript · exceljs

## Uruchomienie lokalne

```bash
git clone [repo-url]
cd marketplace-ai-fixer
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Struktura projektu

```
src/
├── app/
│   ├── page.tsx                    # Dashboard główny
│   ├── layout.tsx                  # Layout z metadata
│   └── api/export/
│       ├── xlsx/route.ts           # Eksport Excel
│       └── csv/route.ts            # Eksport CSV
├── components/dashboard/
│   ├── product-table.tsx           # Tabela produktów
│   ├── status-cards.tsx            # Karty statusowe
│   ├── status-badge.tsx            # Badge EAN/stan
│   ├── product-detail.tsx          # Panel szczegółów
│   └── before-after.tsx            # Porównanie przed/po
├── lib/
│   ├── types.ts                    # TypeScript types
│   ├── pipeline.ts                 # Pipeline czyszczenia + tytuły Allegro
│   ├── parsers.ts                  # Parsery: opis, wymiary, kolor, cena, stan
│   └── validators.ts              # Walidacja EAN-13
└── data/
    └── partner_export_dirty.json   # Dane wejściowe
```

## Czyszczenie danych — co narzędzie robi

| Problem w danych | Rozwiązanie |
|---|---|
| Skrótowe kolory (`j. szary`, `beż`) | Mapowanie na pełne nazwy (`jasnoszary`, `beżowy`) |
| Wymiary z gwiazdkami (`040*060cm`) | Normalizacja (`40 x 60 cm`) |
| 3 formaty opisów (HTML, JSON, plain) | Auto-detekcja + ekstrakcja czystego tekstu |
| Niespójne ceny (`59,90` vs `59.90 PLN`) | Ujednolicony format z walutą |
| Mieszane stany (`15`, `"dużo"`, `0`) | Klasyfikacja: exact / non_exact / empty |
| Błędne EAN-y (`""`, `"BŁĄD_ODCZYTU"`) | Walidacja checksum EAN-13 ze statusem |
