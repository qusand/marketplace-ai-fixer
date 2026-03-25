# Scenariusze Biznesowe — Zadania 2–5 + Case Study

---

## Zadanie 2: Kryzys API (Po gwarancji)

### Tok myślenia

> Klient traci pieniądze, jest wkurzony. Formalnie nie mam podstaw do interwencji. Mogę go olać (poprawnie) albo pomóc (buduje relację). Olewanie poprawnego klienta = głupota. Darmowa praca = zły precedens. Więc: daję mu coś co nic mnie nie kosztuje (wskazówka diagnostyczna), a resztę wyceniam.

**Temat: Ceny Amazon — plan naprawy**

Panie [Imię],

Sprawdźcie w Seller Central zakładkę *API Health* — jeśli status to "Throttled", limit zresetuje się w ciągu 15 minut i problem zniknie sam.

Jeśli to nie pomoże, potrzebna będzie diagnoza po naszej stronie. Wsparcie wdrożeniowe zakończyło się w [miesiąc] i nie macie aktywnego abonamentu, więc interwencja będzie płatna.

Dwie opcje:

1. **Jednorazowa naprawa** — diagnoza + fix, priorytetowo. Rząd wielkości: 500–1500 PLN netto, dokładną wycenę potwierdzę po zleceniu.
2. **Managed Service** — stały monitoring, reagujemy na incydenty zanim je zauważycie. Szczegóły mogę przesłać.

Jeśli chcecie żebym ruszył z diagnozą dziś, potrzebuję potwierdzenia zlecenia do 17:00.

Pozdrawiam,
[Imię]

---

## Zadanie 3: Konsultant vs Wykonawca

### Tok myślenia

> Klient myśli, że kopiowanie 1:1 to najtańsza i najszybsza droga. Muszę mu pokazać w języku pieniędzy: (a) jest niewidoczny, więc traci przychód, (b) poprawki po fakcie kosztują więcej niż adaptacja, (c) eMAG sam go za to karze.

### 3 argumenty za adaptacją AI zamiast kopiowania 1:1

**1. Płacicie za obecność na eMAG, ale nikt Was nie widzi**
eMAG ma własne zasady sortowania wyników. Opisy z Allegro nie pasują do tych zasad — produkty lądują na dole wyników albo poza nimi. Produkty poza top 20 wyników tracą ~80% kliknięć. Adaptacja AI to różnica między "jesteś na eMAG" a "sprzedajesz na eMAG".

**2. Poprawki po publikacji kosztują więcej niż adaptacja**
Kopiowanie 1:1 prawie zawsze kończy się poprawkami: ręczne edycje, reklamacje, kolejne iteracje. Przy 500 produktach to 2–3 dni pracy operatora — płacicie dwa razy za ten sam efekt. Jednorazowa adaptacja AI jest tańsza niż powtarzany rework.

**3. eMAG karze za zduplikowane treści**
Marketplace'y coraz aktywniej penalizują skopiowane opisy — identyczne treści na wielu platformach dostają niższy ranking albo są flagowane jako duplikaty. Kopiowanie 1:1 nie jest neutralne — aktywnie obniża Waszą pozycję. Adaptacja AI generuje unikalne opisy dostosowane do wymagań eMAG, więc nie ryzykujecie kary za duplikację.

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
>
> **Dlaczego nie dzwonię?** CEO nie odbiera — to jest dane w zadaniu. Ale nawet gdyby odbierał: pisemny raport > telefon. Zostawia ślad, nie wymaga natychmiastowej reakcji, pokazuje kontrolę zamiast paniki. Działam autonomicznie i informuję — nie proszę o pozwolenie.

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

**Minuty 3–5: Wysyłam raport sytuacyjny (pisemnie)**
- Slack/Discord + SMS do CEO i COO z linkiem do kanału: "PILNE — błąd marży na [X] produktach, odchyłka [Y]%, wyłączam moduł cenowy. Pełny raport na kanale. Zamówieniami po złej cenie zajmiemy się w poniedziałek."
- Pisemnie, nie telefonicznie — zostawiam ślad, nie wymagam od nikogo natychmiastowej reakcji, pokazuję że mam sytuację pod kontrolą

**Minuty 5–10: Podejmuję decyzję**
- Jeśli próg przekroczony → wyłączam wadliwy moduł cenowy
- Jeśli da się oddzielić moduł cenowy od reszty sprzedaży — oddzielam
- Jeśli nie — wstrzymuję cały system
- Przygotowuję listę zamówień po zaniżonych cenach

**Minuty 10–15: Zabezpieczam**
- Zamówienia już złożone po zaniżonej cenie: eksportuję listę z kwotami, żeby zarząd mógł podjąć decyzję (realizować ze stratą vs kontakt z klientami). Sam nie anuluję — to decyzja biznesowa powyżej mojego mandatu
- Dokumentuję: co zrobiłem, dlaczego, jaki jest status
- Przygotowuję plan przywrócenia na moment kontaktu z zarządem

**Uzasadnienie:** Sprzedaż po zaniżonych cenach = strata rosnąca z każdą minutą. Brak sprzedaży w weekend = strata znana i ograniczona. Pełna dokumentacja pozwoli szybko wrócić do normalnej pracy w poniedziałek.

---

## Zadanie 5: Organizacja Dnia

### Tok myślenia

> Twardy deadline: wycena na spotkanie o 14:00 — robię rano, żeby Sales miał czas na dopytki. Zanim zacznę, 2-minutowy response do klienta A żeby nie wisiał bez odpowiedzi. Po zamknięciu pilnych rzeczy — blok deep work na Amazon (deadline środa, mam dzień zapasu). Case study i literówka na koniec dnia.

### Kolejność: 4 → 1 → 3 → 2 → 5

| Priorytet | Zadanie | Dlaczego |
|-----------|---------|----------|
| **1.** | 4 — Wycena dla Sales | Twardy deadline 14:00, ~30 min, blokuje inną osobę |
| **2.** | 1 — Bug klienta A | Klient czeka. Najpierw triage, potem ETA |
| **3.** | 3 — Deep Work Amazon | Deadline środa, wymaga 5h skupienia. Robię po zamknięciu pilnych rzeczy |
| **4.** | 2 — Case study dla CEO | Deadline jutro rano. Szablon znany, ~45 min |
| **5.** | 5 — Literówka | Zero wpływu, robię jak zostanie czas |

**Plan B:** Jeśli bug klienta A okaże się poważny (np. blokuje mu sprzedaż), zmieniam plan: naprawiam buga, deep work Amazon przesuwam na jutro rano — deadline środa daje dzień zapasu.

**EOD:** Pod koniec dnia wrzucam krótki update na Discorda: co zamknąłem, co przechodzi na jutro, czy są blokery.

### Morning Update na Discordzie (9:15):

> Cześć, plan na dziś:
>
> 1. 9:15–9:50 — wycena dla Sales na spotkanie o 14:00 (robię rano, żeby mieli czas na dopytki)
> 2. 9:50–10:30 — diagnoza błędu u Klienta A → dam znać ETA do południa
> 3. 10:30–13:00 — deep work Amazon (deadline: środa). Będę mniej responsywny — wracam w przerwach
> 4. 13:00–13:45 — bufor na ad-hoc / przygotowanie do spotkania
> 5. 13:45–14:30 — spotkanie z Sales (twardy slot, jestem niedostępny)
> 6. 14:30–15:00 — bufor
> 7. 15:00–15:45 — case study dla CEO na jutro
> 8. Literówkę ogarnę jak zostanie okno
>
> Jeśli coś pilnego — pingujcie, wyjdę z deep worku. EOD dam znać status.

---

## Surowe Case Study (4 zdania)

Narzędzie przetworzyło eksport z 4 produktami w 3 różnych formatach danych — ceny z przecinkami i bez waluty, opisy w surowym HTML i zagnieżdżonym JSON, błędne i brakujące kody EAN — i automatycznie znormalizowało wszystko do jednego spójnego formatu z gotowymi tytułami Allegro. Pipeline wykrył 4 problemy, które przy ręcznym czyszczeniu łatwo przeoczyć: dwa EAN-y z błędną checksumą, jeden brakujący EAN i jedną nieliczbową wartość stanu magazynowego. Przy skali typowego partnera (500–1000 SKU) ten sam proces zastąpiłby ~6 godzin ręcznej pracy operatora i wyeliminował ryzyko, że na marketplace trafią oferty z widocznym kodem HTML lub nieprawidłowym EAN. Operator wrzuca plik, pobiera czysty eksport z jawnie oznaczonymi problemami i zajmuje się wyłącznie decyzjami — nie czyszczeniem danych.
