# Scenariusze Biznesowe — Zadania 2–5 + Case Study

---

## Zadanie 2: Kryzys API (Po gwarancji)

### Tok myślenia

> Klient ma problem, jest zły, traci pieniądze. Ale formalnie nie mamy umowy na wsparcie.
>
> **Co jest ważniejsze — relacja czy formalność?**
> Relacja. Ale nie mogę pracować za darmo — to zły precedens. Szukam środka: daję mu coś wartościowego od razu (quick win), a jednocześnie uczciwie mówię o sytuacji kontraktowej.
>
> **Co mogę dać od razu?**
> Wskazówkę, którą sam może sprawdzić w 2 minuty (API Health w Seller Central). Jeśli to throttling — problem zniknie sam. Ja nic nie tracę, a klient dostaje pomoc.
>
> **Jak zaproponować Managed Service bez wciskania?**
> Przez kontrast: "z MS ten problem wykrylibyśmy zanim go zauważycie". Pokazuję wartość, nie sprzedaję.

**Temat: Pilne — aktualizacja cen Amazon, plan działania**

Panie [Imię],

Widzę problem z cenami na Amazonie — rozumiem, że każda godzina bez aktualizacji to realna strata.

Na szybko: sprawdźcie w Seller Central zakładkę *API Health* — jeśli status to "Throttled", reset limitu nastąpi w ciągu 15 minut. Jeśli to nie pomoże, potrzebna będzie głębsza diagnoza.

Muszę być szczery: wsparcie w ramach wdrożenia skończyło się dwa miesiące temu i nie macie aktywnego abonamentu, więc formalnie nie mamy mandatu do interwencji.

Żeby nie tracić czasu, dwie opcje:

1. **Jednorazowa naprawa** — diagnoza i fix w trybie priorytetowym. Wycenę wyślę w ciągu godziny.
2. **Stała opieka (Managed Service)** — monitoring + reakcja na incydenty. Z MS ten problem wykrylibyśmy automatycznie, zanim zdążylibyście go zauważyć.

Dajcie znać którą drogą idziemy — mogę zacząć dziś.

Pozdrawiam,
[Imię]

---

## Zadanie 3: Konsultant vs Wykonawca

### Tok myślenia

> Klient chce kopiować opisy 1:1. Muszę go przekonać że to zły pomysł — ale nie technicznie ("algorytm", "SEO"), tylko w języku pieniędzy.
>
> **Dlaczego klient to proponuje?**
> Bo myśli że to najtańsze i najszybsze. Muszę pokazać: (a) to nie jest tańsze, bo poprawki kosztują więcej, (b) to nie jest szybsze, bo produkty będą niewidoczne.
>
> **Jakie argumenty zadziałają?**
> Trzy, z trzech różnych stron: utracony przychód (coś czego klient nie widzi), koszt poprawek (coś co poczuje za miesiąc), skalowalność (strategia na przyszłość).

### 3 argumenty za adaptacją AI zamiast kopiowania 1:1

**1. Tracicie pieniądze na niewidoczność**
eMAG ma własne zasady sortowania wyników. Opisy z Allegro nie pasują do tych zasad — produkty lądują na dole wyników albo poza nimi. Płacicie za obecność na eMAG, ale klienci Was po prostu nie widzą. Produkty poza top 20 wyników tracą ~80% kliknięć. Adaptacja AI to różnica między "jesteś na eMAG" a "sprzedajesz na eMAG".

**2. Poprawki po fakcie kosztują więcej niż zrobienie tego dobrze od razu**
Kopiowanie 1:1 prawie zawsze kończy się poprawkami: ręczne edycje, reklamacje, kolejne iteracje. Płacicie dwa razy — raz za kopiowanie, drugi raz za ratowanie jakości. Przy 500 produktach to 2–3 dni pracy operatora na poprawki. Adaptacja AI jest tańsza niż powtarzany rework.

**3. Następny marketplace = ten sam problem od zera**
Kopiowanie nie skaluje się. Każdy nowy marketplace (bol.com, Kaufland, OTTO) ma inne wymagania. Adaptacja AI buduje powtarzalny proces: dziś eMAG, jutro kolejne kanały — bez gaszenia pożarów od nowa.

---

## Zadanie 4: CEO nie odbiera (Stress Test)

### Tok myślenia

> Piątek, 16:30, błąd marży, CEO nie odbiera. To test na podejmowanie decyzji pod presją.
>
> **Jaki jest najgorszy scenariusz jeśli nic nie zrobię?**
> Przez weekend sprzedajemy ze stratą. W poniedziałek 200 zamówień po złej cenie. Strata nieznana i rosnąca z każdą minutą. Nieodwracalne.
>
> **Jaki jest najgorszy scenariusz jeśli wyłączę?**
> Zero sprzedaży w weekend. Strata znana i ograniczona. Odwracalne (włączam z powrotem w poniedziałek).
>
> **Który scenariusz jest gorszy?**
> Pierwszy. Przy nierównych ryzykach zawsze wybieram opcję z mniejszą, znaną stratą.
>
> **Ale co jeśli problem jest mały?**
> Dlatego najpierw sprawdzam skalę. Mała skala = czekam na zarząd. Duża skala = działam sam.
>
> **Zasada:** W sytuacji niepewności, lepiej wytłumaczyć "wstrzymałem, bo nie miałem pewności" niż "kontynuowałem, mimo że wiedziałem o problemie".

**Decyzja: Wstrzymuję system cenowy — jeśli skala przekracza próg akceptowalnego ryzyka.**

### Kiedy co robię:
- Odchyłka ≥ 10% LUB ≥ 50 produktów → **wyłączam natychmiast**
- 10–49 produktów, marża spadła ale nadal dodatnia → **wyłączam moduł cenowy, reszta sprzedaży działa**
- < 10 produktów, marża OK → **monitoruję i czekam na kontakt zarządu** (max 30 min)
- Nie wiem co robić → **wyłączam** (bezpieczniejsza strona błędu)

### Moje kroki w 15 minut:

**Minuty 0–3: Sprawdzam co się dzieje**
- Ile produktów dotkniętych? Jak duża różnica cenowa?
- Czy system nadal publikuje złe ceny?
- Zbieram listę dotkniętych produktów
- Robię screenshoty i eksportuję logi (żeby mieć dowody)

**Minuty 3–5: Dzwonię i piszę**
- Telefon do CEO i COO (dwa razy)
- SMS + Slack/Discord/mail: "PILNE — błąd marży na [X] produktach, odchyłka [Y]%, podejmuję decyzję o wstrzymaniu, oddzwońcie"

**Minuty 5–10: Podejmuję decyzję**
- Jeśli próg przekroczony → wyłączam wadliwy moduł cenowy
- Jeśli da się oddzielić moduł cenowy od reszty sprzedaży — oddzielam
- Jeśli nie — wstrzymuję cały system
- Przygotowuję listę zamówień po zaniżonych cenach

**Minuty 10–15: Zabezpieczam**
- Dokumentuję: co zrobiłem, dlaczego, jaki jest status
- Przygotowuję plan przywrócenia na moment kontaktu z zarządem

**Uzasadnienie:** Sprzedaż po zaniżonych cenach = strata rosnąca z każdą minutą. Brak sprzedaży w weekend = strata znana i ograniczona. Pełna dokumentacja pozwoli szybko wrócić do normalnej pracy w poniedziałek.

---

## Zadanie 5: Organizacja Dnia

### Tok myślenia

> 5 zadań, różne deadliny. Muszę ułożyć je tak, żeby nic nie przegapić i mieć czas na deep work.
>
> **Co ma twardy deadline?**
> Wycena (zadanie 4) — spotkanie o 14:00. Jeśli nie będzie gotowa, Sales idzie z pustymi rękami.
>
> **Co może czekać, ale nie powinno?**
> Bug klienta A (zadanie 1). Nie muszę naprawić od razu — wystarczy szybki response i ETA.
>
> **Co wymaga długiego skupienia?**
> Deep work Amazon (zadanie 3) — 5 godzin. Najlepiej w jednym kawałku, po zamknięciu pilnych rzeczy.
>
> **Sprytny ruch na start:**
> Zanim zacznę wycenę, 2-minutowy response do klienta A: "Widzę, ogarniam". Koszt: 2 minuty. Efekt: klient nie czuje się ignorowany.

### Kolejność: 4 → 1 → 3 → 2 → 5

| Priorytet | Zadanie | Dlaczego |
|-----------|---------|----------|
| **1.** | 4 — Wycena dla Sales | Twardy deadline 14:00, ~30 min, blokuje inną osobę |
| **2.** | 1 — Bug klienta A | Klient czeka. Najpierw triage (wstępna diagnoza i ocena skali problemu), potem ETA |
| **3.** | 3 — Deep Work Amazon | Deadline środa, wymaga 5h skupienia. Robię po zamknięciu pilnych rzeczy |
| **4.** | 2 — Case study dla CEO | Deadline jutro rano. Szablon znany, ~45 min |
| **5.** | 5 — Literówka | Zero wpływu, robię jak zostanie czas |

**Niuans:** Zanim zacznę wycenę, w pierwszych 5 minutach wyślę Klientowi A szybki response: "Widzę zgłoszenie, triage robię dziś rano, wrócę z ETA" — żeby nie wisiał bez odpowiedzi.

**Plan B:** Jeśli bug klienta A okaże się poważny (np. blokuje mu sprzedaż), zmieniam plan: naprawiam buga, deep work Amazon przesuwam na jutro rano — deadline środa daje dzień zapasu.

### Morning Update na Discordzie (9:15):

> Cześć, plan na dziś:
>
> 1. 9:15–9:45 — wycena dla Sales na spotkanie o 14:00
> 2. 9:45–10:15 — diagnoza błędu u Klienta A → dam znać ETA do południa
> 3. 10:15–13:15 — deep work Amazon (deadline: środa). Będę mniej responsywny — wracam w przerwach
> 4. 13:15–13:45 — bufor na ad-hoc / przygotowanie do spotkania
> 5. 13:45–14:30 — spotkanie z Sales
> 6. 14:30–15:15 — case study dla CEO na jutro
> 7. Literówkę ogarnę jak zostanie okno
>
> Jeśli coś pilnego — pingujcie, wyjdę z deep worku.

---

## Surowe Case Study (4 zdania)

Partner dostarczył eksport produktów z niespójnymi formatami cen, opisami w surowym HTML/JSON i brakującymi kodami EAN — ręczne czyszczenie takiego pliku dla katalogu 500+ SKU to kilka godzin pracy i gwarancja błędów. Marketplace AI-Fixer automatycznie normalizuje wymiary, kolory i ceny, czyści opisy z warstwy technicznej, waliduje EAN-y i generuje gotowe tytuły sprzedażowe na Allegro — cały proces trwa sekundy. Narzędzie eliminuje powtarzalną pracę ręczną: operator wrzuca plik i pobiera gotowy eksport z jawnie oznaczonymi problemami do rozwiązania. Przy typowym eksporcie 500–1000 SKU skraca czas przygotowania ofert z kilku godzin do minut i ogranicza ryzyko błędnych danych na marketplace.
