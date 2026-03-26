# Scenariusze Biznesowe — Zadania 2–5 + Case Study

---

## Zadanie 2: Kryzys API (Po gwarancji)

### Tok myślenia

System klienta przestał aktualizować ceny na Amazonie (prawdopodobnie throttling API). Rzeczy raczej same się nie dzieją — pewnie coś nagrzebał sam i teraz się grzeje. Dlatego dzwoni i wypisuje. Z takim trzeba krótko — miał system działający i pomyślał, że taki system mu stworzyliśmy, który nie potrzebuje wsparcia technicznego. Prawdopodobnie ma rację — gdyby nic przy tym nie grzebał i nie zmieniał, nic by się nie popsuło. ALBO po prostu Amazon API ma chwilowy outage — jedna z dwóch opcji.

### Mail:

**Temat: Ceny Amazon — plan naprawy**

Dzień dobry,

Rozumiem zdenerwowanie.

Na ten moment — proszę sprawdzić w Seller Central zakładkę API Health. Jeśli status to "Throttled", limit zresetuje się w ciągu 15 minut i problem zniknie sam. Jeśli jest outage w API Amazona — inni sprzedawcy mają ten sam problem i trzeba poczekać.

Jeśli to nie pomoże, potrzebna będzie diagnoza po naszej stronie. Pański okres wsparcia wygasł 2 miesiące temu. Interwencja będzie zatem płatna.

Dwie opcje:

1. **Jednorazowa naprawa** — diagnoza + deploy fixu. Dokładną wycenę potwierdzę po zleceniu. Natomiast w wypadku kolejnych problemów nie będziemy tego świadomi i znowu będzie Pan musiał do nas pisać.

2. **Managed Service** — stały monitoring. Przy MS ten problem wykrylibyśmy zanim Pan zauważy — system reaguje na throttling automatycznie. Polecam.

Proszę o potwierdzenie co robimy.

Pozdrawiam,
[Imię]

---

## Zadanie 3: Konsultant vs Wykonawca

### Tok myślenia

Klient myśli, że kopiowanie 1:1 to najtańsza i najszybsza droga. Jest naszym klientem z jakiegoś powodu, oferujemy mu pewny serwis i znamy się na rzeczy. Muszę mu dać znać, że z jego myśleniem i drogą wykonawczą — a. będzie niewidoczny, bo to źle zrobi i nie rozumie tego, co przełoży się na tragiczną sprzedaż i będzie roszczeniowy, b. poprawki po jego planie implementacyjnym wyniosą go więcej, niż gdyby zrobił to dobrze tak jak chcemy to zrobić, czyli nie dosyć, że będzie niewidoczny to jeszcze więcej zapłaci za robotę, c. eMAG sam go za to "karze".

### 3 argumenty za adaptacją AI zamiast kopiowania 1:1

**1. Płacenie za obecność, ale nikt was nie widzi.**
eMAG ma własne zasady sortowania. Opisy z Allegro nie pasują do struktury eMAG — produkty lądują na dole wyników. Większość kliknięć idzie do pierwszej strony. Adaptacja AI to różnica między "jesteś na eMAG" a "sprzedajesz na eMAG".

**2. Poprawki kosztują więcej niż adaptacja.**
Kopiowanie 1:1 kończy się ręcznymi poprawkami, kolejnymi iteracjami. Przy większej ilości produktów to parę dni pracy operatora — podwojona płaca za ten sam efekt. Jednorazowa adaptacja AI jest tańsza niż powtarzany rework.

**3. eMAG sam oznacza niską jakość.**
Maszynowo przetłumaczone opisy dostają labelkę "tłumaczenie automatyczne" widoczną dla kupującego. 70% kupujących na eMAG używa filtrów atrybutów — brakujące parametry = produkt niewidoczny. eMAG śledzi Content Quality w panelu sprzedawcy — niska jakość = niższy priorytet w algorytmie.

---

## Zadanie 4: CEO nie odbiera (Stress Test)

### Tok myślenia

Lipa ogólnie — szef nie odbiera, drugi szef też nie, skrypt nie został dobrze przetestowany i źle obliczył marżę, przez co 100 produktów jest po zaniżonej cenie. Pare opcji: wyłączenie tych 100 produktów ze sprzedaży albo całego systemu (za mało danych by wiedzieć ile jest sprzedawanych produktów ogółem — ale to nie zmienia decyzji). Próba naprawy live raczej kończy się pogorszeniem sytuacji, chyba że implementacja jest trywialna.

Sprawa jest prosta — wyłączam sprzedaż tych produktów. Znana strata (brak sprzedaży 100 produktów na weekend) jest lepsza niż nieznana (ile klientów zamówi po stratnej cenie — może akurat boom, nie wiadomo). Jeden outcome jest wiadomy, drugi nie.

Nie dzwonię więcej — jak nie odbiera to ma powód. Piszę raport na Slacka + SMS. Komunikat pisemny > telefon: zostawiam ślad, nie wymaga natychmiastowej reakcji drugiej strony, kontroluję sytuację. Skoro spadło na mnie to zadanie, mam autonomię co do decyzji — dlatego tylko informuję.

**Zasada: w razie wątpliwości — wyłączam. Znana strata jest zawsze lepsza niż nieznana rosnąca.**

### Moje kroki w 15 minut:

**1: Sprawdzam co się dzieje**
- Jak duża różnica cenowa?
- Zbieram listę dotkniętych produktów
- Robię screenshoty i eksportuję logi

**2: Wyłączam**
- Wyłączam wadliwy moduł cenowy (jeśli da się oddzielić od reszty sprzedaży — oddzielam, jeśli nie — wstrzymuję cały system)
- Przygotowuję listę zamówień po zaniżonych cenach

**3: Wysyłam raport sytuacyjny**
- Slack/Discord + SMS do CEO i COO z linkiem do kanału: "PILNE — błąd skryptu, wyłączam moduł cenowy. Pełny raport na kanale. Zamówieniami po złej cenie zajmiemy się w poniedziałek."
- Pisemnie zostawiam ślad, nie wymagam od nikogo natychmiastowej reakcji, pokazuję że ogarniam i przekazuję informacje

**4: Zabezpieczam**
- Zamówienia już złożone po zaniżonej cenie: eksportuję listę z kwotami, żeby zarząd mógł podjąć decyzję (realizować ze stratą vs kontakt z klientami). Sam nie anuluję — to decyzja biznesowa powyżej moich kompetencji
- Dokumentuję: co zrobiłem, dlaczego, jaki jest status
- Przygotowuję plan przywrócenia na moment kontaktu z zarządem

---

## Zadanie 5: Organizacja Dnia

### Kontekst:

1. Klient A zgłasza błąd kategoryzacji (dotyczy 5% produktów).
2. CEO prosi o „surowe case study" na jutro rano.
3. Musisz dziś zrobić 5h „Deep Worku" nad nową integracją Amazon (deadline: środa).
4. Sales prosi o wycenę nowego projektu (30 min) na spotkanie o 14:00.
5. Drobna literówka w panelu innego klienta (nie wpływa na działanie).

### Tok myślenia

Jedna hard set rzecz — wycena na spotkanie o 14:00 (~30 min). O takich rzeczach raczej wie się wcześniej, więc byłoby to przygotowane z wyprzedzeniem. Jeśli dowiaduję się rano — robię od razu, żeby mieć zapas na dopytki od Sales.

5h deep work nad integracją Amazon (deadline środa, jest poniedziałek) — bez problemu, mam cały jutrzejszy dzień jako zapas. Klient A — ogarniam przed deep workiem, żeby nie wisiał. Literówka może poczekać. Case study zostawiam na koniec dnia, jak wszystko zamknięte — czysta głowa, bez wisiorów.

Plan B: jeśli bug klienta A blokuje mu sprzedaż → priorytet nad deep work, Amazon ma dzień zapasu.

### Kolejność:

Wiadomość wyglądałaby mniej więcej tak:

> Co dzisiaj mam zaplanowane:
>
> **9:20–9:50** — Wycena dla Sales. Robię rano, żeby mieć zapas na dopytki przed 14:00
>
> **~9:50** — Diagnoza błędu klienta A. ETA po diagnozie. Jeśli prosty fix — ogarniam od razu. Jeśli duży — przesuwam deep work i naprawiam, Amazon ma dzień zapasu
>
> **~10:30** — Deep work integracja Amazon (jeśli bug klienta A nie jest krytyczny)
>
> **13:45** — Przeglądam wycenę przed spotkaniem. Spotkanie 14:00
>
> **Po spotkaniu** — Dokańczam deep work Amazon
>
> **Literówka** — 2 minuty, zamykam żeby nie wisiała
>
> **Case study** — Wszystko zamknięte, czysta głowa. Deadline jutro rano, nie dziś wieczorem

**Plan B:** Jeśli spotkanie się przeciągnie i integracja nie będzie dokończona — to kończę jutro, tak żeby był czas jeszcze na testy końcowe. Case study wieczorem. Jeśli cały dzień idzie w diabły — case study piszę jutro przed 9:00, deadline to "jutro rano" a nie "dziś".

---

## Surowe Case Study (4 zdania)

Narzędzie przetworzyło eksport z 4 produktami w 3 różnych formatach danych — ceny z przecinkami i bez waluty, opisy w surowym HTML i zagnieżdżonym JSON, błędne i brakujące kody EAN — i automatycznie znormalizowało wszystko do jednego spójnego formatu z gotowymi tytułami Allegro. Pipeline wykrył 4 problemy, które przy ręcznym czyszczeniu łatwo przeoczyć: dwa EAN-y z błędną checksumą, jeden brakujący EAN i jedną nieliczbową wartość stanu magazynowego. Przy skali typowego partnera (500–1000 SKU) ten sam proces zastąpiłby ~6 godzin ręcznej pracy operatora i wyeliminował ryzyko, że na marketplace trafią oferty z widocznym kodem HTML lub nieprawidłowym EAN. Operator wrzuca plik, pobiera czysty eksport z jawnie oznaczonymi problemami i zajmuje się wyłącznie decyzjami — nie czyszczeniem danych.
