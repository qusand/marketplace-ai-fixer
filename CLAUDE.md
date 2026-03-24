# Marketplace AI-Fixer — CLAUDE.md

## Kontekst projektu

To jest zadanie rekrutacyjne dla vAutomate (Commerion Group). Szukają "A-playera" / "VibeCoder" — kogoś kto rozwiązuje realne problemy e-commerce za pomocą AI. Oceniają: agency, judgement, komunikację, orientację na wynik.

Rekruter BĘDZIE przeglądał: kod, historię commitów, README, live demo, UI.

## Źródła prawdy

1. `../zadanie_rekrutacyjne.md` — oryginalne zadanie
2. `../01_FINAL_SPECYFIKACJA_ZADANIE_1.md` — spec techniczny
3. `../02_FINAL_PLAYBOOK_BIZNESOWY.md` — scenariusze biznesowe + case study + deliverables
4. `../partner_export_dirty.json` — dane wejściowe (4 rekordy, 3 formaty opisów)

## Stack technologiczny

- Next.js 16 + TypeScript + Tailwind CSS 4
- shadcn/ui — OBOWIĄZKOWY design system (nie custom divy!)
- exceljs — eksport .xlsx
- next-themes — light/dark mode
- Vercel — deploy

## Zasady bezwzględne

### shadcn/ui — używaj komponentów, nie custom divów

| Komponent | Gdzie MUSI być użyty |
|-----------|---------------------|
| `Card` + `CardContent` | Status karty u góry (NIE custom divy) |
| `Sheet` | Panel szczegółów produktu po kliknięciu wiersza |
| `Table` | Tabela główna + tabele przed/po |
| `Badge` | Statusy EAN i stanów |
| `Tooltip` | Wyjaśnienia na badge'ach |
| `Tabs` | Przełącznik Przed/Po |
| `Button` | Eksport, akcje |

### Kolory badge'ów (spec sekcja 8.6)

- Zielony: `exact`, `valid`
- Żółty: `non_exact`
- Czerwony: `missing`, `non_numeric`, `checksum_invalid`

### Pipeline danych — deterministyczny, zero wyjątków per-rekord

Wszystkie 4 rekordy przechodzą przez identyczny pipeline. Żadnych `if (sku === "BEL-...")`.

### Tytuły Allegro

- Max 75 znaków, sprawdzaj ZAWSZE
- Każda cecha MUSI mieć źródło w opisie tego konkretnego SKU
- Format: `Dywanik Łazienkowy Belweder [Kolor] [Wymiar] [Cechy]`

### UI — narzędziowy, NIE landing-page

- Zero gradientów, zero emoji, zero hero sections
- Jeden kolor akcentowy (indigo)
- Inspiracja: Linear, Stripe Dashboard, Notion
- Light mode domyślny, smooth 350ms transition na dark mode
- Profesjonalny i biznesowy — rekruter ocenia "styl"

### Eksport

- .xlsx: nagłówki bold, auto-width, conditional formatting (czerwone na błędach), auto-filter
- .csv: UTF-8 BOM, separator `;`
- Oba: 15 kolumn w kolejności ze spec sekcji 10

## Workflow skilli (OBOWIĄZKOWY)

```
Planujesz?           → Superpowers /brainstorming
Kodujesz parser?     → Superpowers /tdd + Context7
Budujesz UI?         → Superpowers /execute-plan + Context7 + Frontend Design
Nie działa?          → Superpowers /debugging
Skończyłeś moduł?   → Code Review → poprawki
Używasz biblioteki?  → ZAWSZE Context7 (aktualne API)
Commitujesz?         → Atomic commits, opisowe wiadomości
```

## Commity

- Atomic — jeden commit = jedna logiczna zmiana
- Opisowe wiadomości — rekruter czyta git log
- Konwencja: `feat:`, `fix:`, `style:`, `docs:`, `refactor:`
- Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>

## Czego NIE robić

- Nie pisać kodu bez wcześniejszego sprawdzenia Context7 dla API bibliotek
- Nie tworzyć custom divów gdy jest komponent shadcn/ui
- Nie dodawać twista przed zamknięciem must-have
- Nie commitować .env plików
- Nie używać `git add -A` — zawsze jawnie per-plik
