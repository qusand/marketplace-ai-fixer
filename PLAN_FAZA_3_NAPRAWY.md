# PLAN FAZA 3: Naprawy krytyczne + Rewizja UI

> Ten plan kontynuuje po PROGRESS.md. Wykonuj krok po kroku, oznaczaj jako DONE.

## Kolejność: najpierw GAP-y krytyczne, potem polerowanie

---

### KROK 1: Napraw badge checksum_invalid na czerwony
**Plik:** `src/components/dashboard/status-badge.tsx`
**Co:** Zmien checksum_invalid EAN konfiguracje z amber na red
**Decyzja:** Spec sekcja 8.6 jednoznacznie mowi RED. Nie dyskutujemy.
**Skill:** brak — prosta zmiana
**Czas:** 2 min

### KROK 2: Zamien status karty na shadcn Card
**Plik:** `src/components/dashboard/status-cards.tsx`
**Co:** Zamien custom div na import Card, CardContent z shadcn/ui
**Decyzja:** Zachowaj metryki (Rekordy, EAN poprawne, EAN problemy, Stan niedokladny) — zmien tylko wrapper
**Skill:** Context7 -> sprawdz aktualne API shadcn Card
**Czas:** 15 min

### KROK 3: Zamien inline panel na Sheet
**Pliki:** `src/components/dashboard/product-detail.tsx` + `product-table.tsx`
**Co:**
1. Zamien renderowanie inline detail na Sheet (slide-out z prawej strony)
2. Sheet otwiera sie po kliknieciu wiersza
3. Zawartosc: pelny opis czysty, format zrodlowy, surowe dane, tytul Allegro
4. Przycisk zamkniecia
**Decyzja:** Sheet (nie Dialog) — bardziej pasuje do narzedziowego UX, nie blokuje widoku tabeli
**Skill:** Context7 -> sprawdz aktualne API shadcn Sheet
**Czas:** 30 min

### KROK 4: Frontend Design review
**Co:** Uruchom skill Frontend Design w Claude Code:
1. Pokaz mu aktualny stan dashboardu (screenshot lub opis)
2. Zapytaj o propozycje poprawek do narzedziowego wygladu
3. Sprawdz: spacing, typografia, hierarchia wizualna, spojnosc
4. Spec: inspiracja Linear, Stripe Dashboard, Notion
**Skill:** Frontend Design
**Czas:** 20 min

### KROK 5: Code Review bezpieczenstwa
**Co:** Uruchom Code Review w Claude Code, focus na:
1. XSS w opisach HTML — czy stripHtml() jest bezpieczny? Czy renderujemy surowy HTML gdziekolwiek?
2. Injection — czy niebezpieczne metody renderowania sa uzyte? (nie powinny byc)
3. Edge cases — co jesli JSON w opisie jest malformed? Brak try/catch?
4. TypeScript — czy typy sa scisle, czy jest any?
5. Performance — czy na 4 rekordach jest cos co by padlo na 1000?
**Skill:** Code Review agent
**Czas:** 15 min

### KROK 6: Poprawki po Code Review
**Co:** Napraw issues z kroku 5
**Skill:** Superpowers /debugging jesli cos nie dziala
**Czas:** 15 min

### KROK 7: Atomic commits + push
**Co:**
1. Kazda logiczna zmiana = osobny commit
2. Format: fix: use shadcn Card for status cards, feat: use Sheet for product detail panel, etc.
3. Push do main -> Vercel auto-deploy
**Czas:** 10 min

---

## Po zakonczeniu Fazy 3 -> przejdz do PLAN_FAZA_4_POLISH.md
