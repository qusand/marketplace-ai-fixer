# PLAN FAZA 4: Polerowanie + Twist + Dostarczenie

> Wykonuj TYLKO po zamknieciu wszystkich GAP-ow z PLAN_FAZA_3_NAPRAWY.md

---

### KROK 1: Scenariusze biznesowe — personalizacja
**Plik:** `SCENARIUSZE_BIZNESOWE.md`
**Co:**
1. Przeczytaj playbook (02_FINAL_PLAYBOOK_BIZNESOWY.md) — tony, granice, strukture
2. Sprawdz czy odpowiedzi brzmi jak od prawdziwego konsultanta e-commerce, nie jak wypelniony formularz
3. Sprawdz czy email (Zadanie 2) ma konkretne imie, nie [Imie]
4. Sprawdz czy Morning Update (Zadanie 5) jest naturalny
5. Sprawdz case study — 4 zdania, uczciwe szacunki
**Decyzja:** Jezeli sa placeholdery [Imie] — wypelnij lub zostaw generyczne "Panie/Pani"
**Czas:** 20 min

### KROK 2: Twist (JEDEN — wybierz najcenniejszy)
**Opcje (spec sekcja 9):**
1. Drag & drop JSON upload — najprostszy technicznie, natychmiast widoczny
2. Historia zmian — log co zmieniono i dlaczego per rekord
3. Podglad mockupu Allegro — wow efekt ale wiecej pracy
4. AI tytuły — przycisk "Wygeneruj z AI" obok tytulu regułowego

**Rekomendacja:** Drag & drop (#1) — 30 min pracy, natychmiast widoczny, pokazuje ze tool jest uniwersalny nie tylko na wbudowany JSON.

**Implementacja:**
1. Dodaj drop zone na gorze dashboardu lub obok przyciskow eksportu
2. Accept: .json
3. Waliduj strukture (czy ma wymagane klucze)
4. Przetworz przez ten sam pipeline
5. Wyswietl wyniki

**Skill:** Context7 -> File API / react-dropzone
**Czas:** 30-45 min

### KROK 3: README finalne
**Plik:** `README.md`
**Co:**
1. Screenshot dashboardu (light mode) — dodaj do repo jako `docs/screenshot.png`
2. Sprawdz czy live demo link dziala
3. Sprawdz czy npm install && npm run dev dziala na czystym klonie
4. Dodaj sekcje: Features, Tech Stack, Approach, Local Setup, Screenshot
**Czas:** 15 min

### KROK 4: Finalne QA
**Co:**
1. Otworz live demo — sprawdz kazda funkcje
2. Kliknij kazdy wiersz — czy Sheet sie otwiera?
3. Przełacz light/dark — czy smooth?
4. Pobierz Excel — otworz w Excel — polskie znaki OK? Formatting OK?
5. Pobierz CSV — otworz w Excel — separator OK? BOM OK?
6. Sprawdz tytuly Allegro — kazdy <= 75 znakow?
7. Sprawdz responsive — tablet width — czy tabela scrolluje?
**Skill:** Agent Browser Verify (jesli dostepny)
**Czas:** 15 min

### KROK 5: Git history review
**Co:**
1. Przejrzyj git log — czy commity sa opisowe?
2. Jesli sa "WIP" commity — zrob interactive rebase (tylko jesli naprawde potrzebne)
3. Dodaj final commit: "chore: final QA pass before submission"
**Czas:** 10 min

### KROK 6: Przygotuj wiadomosc do rekrutera
**Co:** Uzyj szablonu z playbook sekcja 7:
```
Czesc!

Oto moje rozwiazanie zadania rekrutacyjnego:

Zadanie 1 — Marketplace AI-Fixer:
- Repozytorium: [link do GitHub]
- Live demo: [link do Vercel]
- Eksport danych dostepny do pobrania z dashboardu

Zadania 2-5 — Scenariusze biznesowe + Case Study:
- [link do pliku w repo]

Chetnie odpowiem na pytania. Pozdrawiam, [imie]
```
**Czas:** 5 min

### KROK 7 (OPCJONALNE): Loom video
**Co:** Max 3 min:
1. 0:00-0:30 — Demo dashboardu: pokaz dane -> eksport -> download
2. 0:30-1:30 — Jedna decyzja techniczna + jedna biznesowa
3. 1:30-2:30 — Scenariusz 4 (stress test) — pokaz jak myslisz pod presja
**Czas:** 30 min

---

## Checklista finalna (z playbook sekcja 8)

### Zadanie 1
- [ ] Wszystkie 4 rekordy poprawnie oczyszczone
- [ ] Eksport .xlsx otwiera sie w Excelu bez problemow z polskimi znakami
- [ ] Dashboard wyglada profesjonalnie (nie "AI-generated")
- [ ] Tytuly Allegro <= 75 znakow (sprawdz kazdy)
- [ ] Live demo dziala pod linkiem
- [ ] README pozwala uruchomic lokalnie bez dopytywania

### Zadania 2-5
- [ ] Kazda odpowiedz ma jasna decyzje/teze na poczatku
- [ ] Argumenty biznesowe w jezyku pieniedzy, nie technikaliow
- [ ] Morning Update jest konkretny i zamyka pytania
- [ ] Case study: 4 zdania, uczciwe szacunki

### Meta
- [ ] Wszystkie linki aktualne i dzialajace
- [ ] Zaden twist nie rozbi jakosci podstawy
- [ ] Wiadomosc do rekrutera jest zwiezla i profesjonalna
