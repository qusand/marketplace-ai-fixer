# Progress Tracker — Marketplace AI-Fixer

> Aktualizuj po każdym kroku. Sesja handoff: czytaj ten plik jako pierwsze.

## Stan na: 2026-03-24

### FAZA 0: Research i Design

| # | Zadanie | Status | Uwagi |
|---|---------|--------|-------|
| 0a | Research rynkowy Allegro | ✅ DONE | `research_rynkowy.md` istnieje |
| 0b | Brainstorming architektury (`/brainstorming`) | ❌ POMINIĘTE | GSD nie użył Superpowers — DO ZROBIENIA w rewizji |
| 0c | Projekt UI z Frontend Design | ❌ POMINIĘTE | GSD nie użył Frontend Design — DO ZROBIENIA w rewizji |
| 0d | Optymalizacja tytułów Allegro po researchu | ⚠️ CZĘŚCIOWE | Tytuły istnieją, ale nie przeszły rewizji po researchu |

### FAZA 1: Budowanie

| # | Zadanie | Status | Uwagi |
|---|---------|--------|-------|
| 1.1 | Setup Next.js + shadcn/ui | ✅ DONE | Next.js 16, Tailwind 4, shadcn/ui zainstalowany |
| 1.2 | Pipeline czyszczenia danych | ✅ DONE | 34/34 testy przechodzą, tabela referencyjna zgodna ze spec |
| 1.3 | Walidacja EAN-13 | ✅ DONE | Checksum poprawny |
| 1.4 | Generowanie tytułów Allegro | ✅ DONE | ≤75 znaków, cechy z opisów |
| 1.5 | Tabela główna (shadcn Table) | ✅ DONE | 7 kolumn ze spec |
| 1.6 | Badge'e statusów (EAN + Stan) | ⚠️ DO POPRAWY | `checksum_invalid` jest amber zamiast red (spec: red) |
| 1.7 | Karty statusowe | ⚠️ DO POPRAWY | Używają custom divów zamiast shadcn Card |
| 1.8 | Panel szczegółów produktu | ❌ DO PRZEBUDOWY | Inline panel zamiast Sheet (spec wymaga Sheet/Dialog) |
| 1.9 | Widok Przed/Po (Tabs) | ✅ DONE | Stabilne wymiary tabel |
| 1.10 | Eksport .xlsx | ✅ DONE | Bold headers, auto-width, conditional formatting, auto-filter |
| 1.11 | Eksport .csv | ✅ DONE | UTF-8 BOM, separator `;` |
| 1.12 | Light/Dark mode | ✅ DONE | Light default, 350ms smooth transition |
| 1.13 | Tooltip na badge'ach | ✅ DONE | Wyjaśnienia dla wszystkich statusów |

### FAZA 2: QA, Review i Deploy

| # | Zadanie | Status | Uwagi |
|---|---------|--------|-------|
| 2.1 | Deploy Vercel | ✅ DONE | Live na marketplace-ai-fixer.vercel.app |
| 2.2 | README | ✅ DONE | Live demo link, setup, struktura |
| 2.3 | Scenariusze biznesowe (Tasks 2-5) | ✅ DONE | `SCENARIUSZE_BIZNESOWE.md` |
| 2.4 | Case study | ✅ DONE | 4 zdania w pliku scenariuszy |
| 2.5 | Code Review pełnego projektu | ❌ NIE ZROBIONE | Spec wymaga — security (XSS!), performance, edge cases |
| 2.6 | Frontend Design review | ❌ NIE ZROBIONE | Spec wymaga — ostatnie poprawki wizualne |
| 2.7 | Git history cleanup | ❌ NIE ZROBIONE | Commity powinny być opisowe i atomowe |
| 2.8 | Loom video | ❌ NIE ZROBIONE | 3 min max, opcjonalne ale rekomendowane |

### TWIST (po must-have)

| # | Twist | Status |
|---|-------|--------|
| T1 | Drag & drop upload JSON | ❌ Nie zaczęte |
| T2 | AI-generowane tytuły | ❌ Nie zaczęte |
| T3 | Podgląd mockupu Allegro | ❌ Nie zaczęte |
| T4 | Historia zmian (changelog) | ❌ Nie zaczęte |

---

## GAPS — co musi być naprawione PRZED dostarczeniem

### GAP 1: shadcn Card nie jest używany (CRITICAL)
- `status-cards.tsx` używa custom `<div>` zamiast `Card`/`CardContent`
- Napraw: zamień na shadcn Card

### GAP 2: Sheet nie jest używany dla detali produktu (CRITICAL)
- Spec explicite mówi: "Sheet/Dialog — Panel szczegółów produktu"
- Aktualnie: inline panel z animacją
- Napraw: użyj `Sheet` (slide-out z prawej) na kliknięcie wiersza

### GAP 3: checksum_invalid badge ma zły kolor (MEDIUM)
- Aktualnie: amber/yellow
- Spec sekcja 8.6: powinien być RED
- Napraw: zmień className w `status-badge.tsx`

### GAP 4: Superpowers nie zostały użyte (PROCESS)
- `/brainstorming` — nie użyte przed kodowaniem
- `/tdd` — nie użyte przy parserze
- `/execute-plan` — nie użyte przy UI
- Napraw: użyj w następnej sesji dla rewizji

### GAP 5: Frontend Design nie został użyty (PROCESS)
- Spec mówi: "Przed kodowaniem dashboardu użyj skilla Frontend Design"
- Napraw: użyj teraz do rewizji UI

### GAP 6: Code Review nie został zrobiony (PROCESS)
- Spec mówi: "Code Review — security (XSS!), performance, edge cases"
- Napraw: zrób przed finalnym pushem
