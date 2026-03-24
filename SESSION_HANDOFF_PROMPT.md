# PROMPT DO WKLEJENIA W NOWA SESJE CLAUDE CODE

Skopiuj wszystko ponizej linii i wklej jako pierwszy message:

---

Kontynuujesz prace nad zadaniem rekrutacyjnym Marketplace AI-Fixer. Projekt jest w C:\Users\erykt\OneDrive\Pulpit\REKRUTACJA\marketplace-ai-fixer

## Co musisz przeczytac NAJPIERW (w tej kolejnosci):

1. `CLAUDE.md` — zasady projektu, stack, workflow skilli
2. `PROGRESS.md` — co jest zrobione, co nie, jakie sa GAPS
3. `PLAN_FAZA_3_NAPRAWY.md` — nastepne kroki do wykonania (7 krokow)
4. `PLAN_FAZA_4_POLISH.md` — po zakonczeniu fazy 3

## Kontekst:

To jest zadanie rekrutacyjne dla vAutomate (Commerion Group). Szukaja "A-playera" / "VibeCoder". Dashboard do czyszczenia brudnych danych produktowych z marketplace.

## Co juz dziala:
- Pipeline danych: 34/34 testy OK, tabela referencyjna zgodna ze spec
- Dashboard z tabela glowna, badge'ami, kartami statusowymi, widokiem przed/po
- Eksport .xlsx i .csv z pelnym formatowaniem
- Light/dark mode z smooth 350ms transition
- Deploy na Vercel: marketplace-ai-fixer.vercel.app
- Scenariusze biznesowe + case study napisane
- README z live demo linkiem

## Co MUSI byc naprawione (GAPS — krytyczne):

1. **shadcn Card** — status-cards.tsx uzywa custom divow zamiast Card/CardContent z shadcn. ZAMIEN.
2. **shadcn Sheet** — panel szczegolow produktu jest inline zamiast Sheet (slide-out). Spec WYMAGA Sheet. PRZEBUDUJ.
3. **Badge checksum_invalid** — ma amber/zolty kolor zamiast czerwonego. Spec mowi RED. ZMIEN.

## Workflow — OBOWIAZKOWY:

- Uzywaj Context7 przy kazdej bibliotece (shadcn Card API, shadcn Sheet API)
- Uzywaj Frontend Design do rewizji UI po naprawach
- Uzywaj Code Review przed finalnym pushem (XSS, edge cases, TypeScript)
- Commity atomowe z opisowymi wiadomosciami

## Zrodla prawdy (w folderze REKRUTACJA, nadrzednym):
- `../zadanie_rekrutacyjne.md` — oryginalne zadanie
- `../01_FINAL_SPECYFIKACJA_ZADANIE_1.md` — spec techniczny
- `../02_FINAL_PLAYBOOK_BIZNESOWY.md` — scenariusze biznesowe

Zacznij od przeczytania CLAUDE.md i PROGRESS.md, potem wykonuj PLAN_FAZA_3_NAPRAWY.md krok po kroku. Po kazdym kroku aktualizuj PROGRESS.md.
