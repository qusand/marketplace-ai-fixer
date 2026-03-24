# Scenariusze Biznesowe — Zadania 2–5 + Case Study

---

## Zadanie 2: Kryzys API (Po gwarancji)

### Tok myślenia

> Zanim napiszę maila, muszę rozstrzygnąć napięcie: klient ma pilny problem, ale formalnie nie mamy mandatu do interwencji.
>
> **Krok 1 — Co jest ważniejsze: relacja czy formalność?**
> Relacja. Klient w panice nie chce usłyszeć "sprawdźcie umowę". Ale też nie mogę pracować za darmo — to ustawia zły precedens. Szukam złotego środka: daję natychmiastową wartość (quick win), jednocześnie uczciwie komunikuję sytuację kontraktową.
>
> **Krok 2 — Jaki quick win mogę dać od razu?**
> Wskazanie API Health w Seller Central to coś, co klient może zrobić sam w 2 minuty. Jeśli to throttling, problem się rozwiąże bez mojej interwencji. Zyskuję wdzięczność przy zerowym koszcie własnym.
>
> **Krok 3 — Jak zakotwiczyć rozmowę o Managed Service?**
> Nie sprzedażowo ("kup nasz pakiet"), tylko przez kontrast: "w ramach MS ten problem zostałby wykryty automatycznie, zanim zdążylibyście go zauważyć". Pokazuję wartość, nie narzucam.
>
> **Krok 4 — Ton maila?**
> Konkretny, bez korporacyjnego bełkotu. Pierwszy akapit = "rozumiem problem". Środek = "oto co możesz zrobić teraz". Koniec = "oto opcje dalej". Zero zbędnych zdań.

**Temat: Pilne — aktualizacja cen Amazon, plan działania**

Panie [Imię],

Widzę problem z synchronizacją cen na Amazonie — rozumiem, że każda godzina bez aktualizacji to realna strata na sprzedaży i priorytetem jest jak najszybsze przywrócenie działania.

Po wstępnej analizie wygląda to na throttling po stronie Amazon API, prawdopodobnie związany z limitem requestów. Niezależnie od dalszych ustaleń, na start jedno: sprawdźcie w panelu Seller Central zakładkę *API Health* — jeśli widzicie status "Throttled", reset limitu zwykle następuje w ciągu 15 minut. Jeśli to nie pomoże, potrzebna będzie głębsza diagnoza.

Muszę być transparentny: okres wsparcia w ramach wdrożenia zakończył się dwa miesiące temu, a projekt nie jest objęty abonamentem Managed Service, więc formalnie nie mamy aktywnego mandatu do interwencji.

Żeby nie tracić czasu, proponuję dwie ścieżki:

1. **Interwencja awaryjna (jednorazowa)** — diagnoza i naprawa w trybie priorytetowym. Wycenę prześlę w ciągu godziny po potwierdzeniu zlecenia.

2. **Managed Service (rekomendacja na przyszłość)** — miesięczny abonament obejmujący monitoring, reakcję na incydenty i proaktywną optymalizację. Dla kontekstu: w ramach MS taki incydent zostałby wykryty automatycznie przez monitoring, zanim zdążylibyście go zauważyć — a reakcja nastąpiłaby bez konieczności pisania maili.

Proszę o krótką informację, którą ścieżką idziemy — mogę zacząć jeszcze dziś.

Pozdrawiam,
[Imię]

---

## Zadanie 3: Konsultant vs Wykonawca

### Tok myślenia

> Klient chce kopiować opisy 1:1 z Allegro na eMAG. Muszę go przekonać, że to zły pomysł — ale nie mogę powiedzieć "nie, bo nie". Potrzebuję argumentów, które trafiają w **pieniądze**, nie w technikalia.
>
> **Krok 1 — Dlaczego klient to proponuje?**
> Bo wydaje mu się że to najtańsza i najszybsza opcja. Muszę rozbić te dwa przekonania: (a) to nie jest tańsze, bo rework kosztuje więcej, (b) to nie jest szybsze, bo produkty będą niewidoczne.
>
> **Krok 2 — Jakie argumenty zadziałają?**
> Klient nie jest techniczny. "SEO", "algorytm rankingowy", "tokenizacja" — to szum. Muszę mówić językiem: "tracisz pieniądze", "płacisz dwa razy", "konkurencja Cię wyprzedza". Konkrety > abstrakcje.
>
> **Krok 3 — Ile argumentów?**
> Trzy. Jeden = za mało, wygląda na opinię. Pięć = za dużo, gubi się przekaz. Trzy = wzorzec "problem → koszt → alternatywa" powtórzony trzy razy, każdy z innego kąta.
>
> **Krok 4 — Kolejność argumentów?**
> Zaczynam od największego bólu (utracony przychód — coś czego klient nawet nie widzi), potem koszt reworku (coś co poczuje za miesiąc), potem skalowalność (strategia na przyszłość). Od pilnego do strategicznego.

### 3 argumenty biznesowe za adaptacją AI zamiast kopiowania 1:1

**Argument 1: Utracony przychód z niskiej widoczności**
eMAG ma własny algorytm rankingowy. Opisy skopiowane 1:1 z Allegro nie trafiają w jego wymagania — produkty lądują nisko w wynikach lub poza nimi. Innymi słowy — wydajecie budżet na obecność na eMAG, ale klienci Was nie widzą. Produkty poza top 20 wyników tracą ~80% kliknięć — to koszt alternatywny, którego nie widać w raporcie. Adaptacja AI to różnica między "jesteś na eMAG" a "sprzedajesz na eMAG". Większość konkurentów kopiuje 1:1 — kto adaptuje, ten wygrywa widoczność.

**Argument 2: Koszt reworku jest wyższy niż koszt adaptacji**
Tania ścieżka prawie zawsze kończy się poprawkami po publikacji: ręczne edycje, reklamacje, kolejne iteracje. Zespół płaci dwa razy — raz za kopiowanie, drugi raz za ratowanie jakości. Przy katalogu 500 SKU, rework po kopiowaniu 1:1 to ~2–3 dni robocze operatora. Jednorazowa adaptacja AI kosztuje mniej niż powtarzany rework — i daje wynik od razu gotowy do publikacji.

**Argument 3: Skalowalność na przyszłość**
Kopiowanie 1:1 nie skaluje się. Każdy nowy marketplace (bol.com, Kaufland, OTTO) ma inne wymagania. Proces adaptacji AI buduje powtarzalny model: dzisiaj eMAG, jutro kolejne kanały bez gaszenia pożarów od zera. Klient kupuje nie opis — kupuje przewidywalność.

---

## Zadanie 4: CEO nie odbiera (Stress Test)

### Tok myślenia

> Piątek, 17:00, błąd marży, CEO nie odbiera. To jest klasyczny stress test — nie na wiedzę techniczną, tylko na to jak podejmuję decyzje pod presją i bez pełnej informacji.
>
> **Krok 1 — Jaki jest mój najgorszy scenariusz?**
> Zostawiam system włączony → przez weekend sprzedajemy ze stratą → w poniedziałek jest 200 zamówień po złej cenie → firma traci kilkadziesiąt tysięcy. To jest nieodwracalne.
>
> **Krok 2 — Jaki jest drugi najgorszy scenariusz?**
> Wyłączam system → tracimy weekend sprzedaży → w poniedziałek CEO pyta "dlaczego wyłączyłeś?" → ale straty są znane, ograniczone i odwracalne (można wznowić sprzedaż natychmiast).
>
> **Krok 3 — Asymetria ryzyka**
> Strata z kontynuowania = nieznana i rosnąca (każde kolejne zamówienie to kolejna strata).
> Strata z wstrzymania = znana i ograniczona (utracona sprzedaż za weekend).
> → Przy nierównych ryzykach zawsze wybieram opcję z ograniczoną, znaną stratą.
>
> **Krok 4 — Ale co jeśli problem jest mały?**
> Dlatego potrzebuję progów. Nie wyłączam wszystkiego od razu — najpierw diagnozuję skalę. Jeśli <10 SKU i marża nadal dodatnia, mogę poczekać 30 minut na kontakt z zarządem. Jeśli ≥50 SKU lub ≥10% odchyłki — nie czekam.
>
> **Krok 5 — Dokumentacja**
> Niezależnie od decyzji, muszę mieć dowody: logi, screenshoty, lista zamówień, timeline. Bo w poniedziałek ktoś zapyta "co się stało i kiedy". Jeśli tego nie zabezpieczę teraz, rekonstrukcja z pamięci będzie niepełna.
>
> **Krok 6 — Dlaczego "domyślna akcja = wstrzymanie"?**
> Bo w sytuacji niepewności, błąd po stronie ostrożności kosztuje mniej niż błąd po stronie działania. Łatwiej wytłumaczyć "wstrzymałem, bo nie miałem pewności" niż "kontynuowałem, mimo że wiedziałem o problemie".

**Decyzja: Wstrzymuję system cenowy — jeśli skala przekracza próg akceptowalnego ryzyka.**

### Próg decyzyjny:
- Odchyłka cenowa ≥ 10% LUB dotyczy ≥ 50 SKU → **wstrzymuję natychmiast**
- 10–49 SKU i marża spadła, ale nadal dodatnia → **wstrzymuję moduł cenowy, ale nie całą sprzedaż** (izolacja)
- < 10 SKU i marża nadal dodatnia → **monitoruję i czekam na kontakt zarządu** (max 30 min)
- W razie wątpliwości → domyślna akcja to **wstrzymanie** (bezpieczniejsza strona błędu)

### Kroki w ciągu 15 minut:

**Minuty 0–3: Rozpoznanie**
- Potwierdzam skalę: ile produktów dotkniętych, jak duża różnica cenowa
- Sprawdzam czy problem nadal aktywnie publikuje złe ceny
- Zbieram listę dotkniętych SKU
- Screenshot stanu systemu + export logów cenowych na moment incydentu (zabezpieczenie dowodowe)

**Minuty 3–5: Eskalacja**
- Telefon do CEO i COO (powtórzony dwukrotnie)
- SMS + wiadomość na Slacku/Discordzie/mailu: "PILNE — błąd marży na [X] produktach, odchyłka [Y]%, podejmuję decyzję o wstrzymaniu systemu cenowego, oddzwońcie"
- Notatka z godziną, skalą i hipotezą przyczyny

**Minuty 5–10: Decyzja**
- Brak pewnej poprawki w krótkim czasie → wyłączam wadliwy proces cenowy (jeśli próg przekroczony)
- Jeśli da się izolować tylko moduł cenowy bez zatrzymywania reszty sprzedaży — izoluję
- Jeśli nie — wstrzymuję cały system
- Przygotowuję listę zamówień złożonych po zaniżonych cenach do analizy prawno-operacyjnej

**Minuty 10–15: Zabezpieczenie**
- Wykonuję wybraną akcję
- Dokumentuję: co zrobiłem, dlaczego, jaki jest status, jakie dane zabezpieczyłem
- Przygotowuję plan przywrócenia na moment kontaktu z zarządem

**Uzasadnienie:** Kontynuowanie sprzedaży po zaniżonych cenach generuje realną, rosnącą stratę. Brak sprzedaży w weekend to strata znana i ograniczona. Pełna dokumentacja (logi, screenshoty, lista zamówień) pozwoli szybko przywrócić działanie i ocenić skalę strat po kontakcie z zespołem zarządzającym. Zasada: najpierw ogranicz szkody, potem naprawiaj.

---

## Zadanie 5: Organizacja Dnia

### Tok myślenia

> 5 zadań, różne deadliny, różna pilność. Muszę je ułożyć w kolejności, która minimalizuje ryzyko (nic nie przegapisz) i maksymalizuje efektywność (deep work w jednym kawałku).
>
> **Krok 1 — Klasyfikacja Eisenhowera**
> - Zadanie 4 (wycena) → pilne + ważne (twardy deadline 14:00, blokuje inną osobę)
> - Zadanie 1 (bug klienta A) → pilne + ważne (klient czeka, realna strata)
> - Zadanie 3 (deep work Amazon) → ważne + niepilne (deadline środa, ale wymaga największego bloku czasu)
> - Zadanie 2 (case study CEO) → ważne + niepilne (deadline jutro rano, szablon jest znany)
> - Zadanie 5 (literówka) → niepilne + nieważne (zero wpływu biznesowego)
>
> **Krok 2 — Zależności i blokady**
> Zadanie 4 blokuje spotkanie o 14:00 — jeśli wycena nie będzie gotowa, Sales idzie na spotkanie z pustymi rękami. To jedyny hard deadline dnia.
> Zadanie 1 — klient czeka. Ale nie muszę naprawić buga od razu — wystarczy triage (wstępna diagnoza i ocena skali problemu) + ETA. Klient potrzebuje wiedzieć że ktoś się tym zajmuje.
>
> **Krok 3 — Optymalizacja bloków czasu**
> Deep work (zadanie 3) wymaga ~3h skupienia. Jeśli rozbiorę go na kawałki, stracę czas na context switching. Najlepiej go zrobić po zamknięciu zadań "z deadline'em" — wtedy mam czysty umysł.
>
> **Krok 4 — Quick win na start**
> Zamiast od razu wskakiwać w wycenę, wysyłam 2-minutowy response do Klienta A: "Widzę, ogarniam, dam znać do południa". Koszt: 2 minuty. Wartość: klient nie czuje się ignorowany. To zmienia jego percepcję z "nikt się tym nie zajmuje" na "jest pod kontrolą".
>
> **Krok 5 — Fallback plan**
> Co jeśli bug u Klienta A okaże się krytyczny? Wtedy repriorytyzuję: naprawiam buga, deep work Amazon przesuwam na jutro rano. Deadline środa daje margines jednego dnia. Bez fallbacku plan jest kruchy.

### Kolejność: 4 → 1 → 3 → 2 → 5

| Priorytet | Zadanie | Dlaczego |
|-----------|---------|----------|
| **1.** | 4 — Wycena dla Sales | Twardy deadline zewnętrzny (spotkanie 14:00), ~30 min pracy, blokuje inną osobę |
| **2.** | 1 — Bug kategoryzacji klienta A | Klient czeka, realny problem (5% produktów), najpierw triage i ETA |
| **3.** | 3 — Deep Work Amazon | Najdłuższy blok, deadline środa. Po zamknięciu 4 i 1 mam spokój na skupienie |
| **4.** | 2 — Case study dla CEO | Termin jutro rano. Struktura case study jest powtarzalna (problem → rozwiązanie → wynik → następne kroki), ~45 min pracy szablonowej |
| **5.** | 5 — Literówka | Zero wpływu biznesowego, wrzucam jak zostanie czas |

**Niuans:** Zanim zacznę wycenę, w pierwszych 5 minutach wyślę Klientowi A szybki response: "Widzę zgłoszenie, triage robię dziś rano, wrócę z ETA" — żeby nie wisiał bez odpowiedzi.

**Fallback:** Jeśli triage bugu u Klienta A pokaże, że problem jest krytyczny (np. blokuje sprzedaż), repriorytyzuję: naprawiam bug, a deep work Amazon przesuwam na jutro rano — deadline środa daje margines.

### Morning Update na Discordzie (9:15):

> Cześć, plan na dziś:
>
> 1. 9:15–9:45 — wycena dla Sales na spotkanie o 14:00
> 2. 9:45–10:15 — triage błędu kategoryzacji u Klienta A → dam znać ETA naprawy do południa
> 3. 10:15–13:15 — deep work nad integracją Amazon (deadline: środa). Będę mniej responsywny na czacie — wracam w przerwach
> 4. 13:15–13:45 — bufor na ad-hoc / przygotowanie do spotkania
> 5. 13:45–14:30 — spotkanie z Sales (wycena), więc w tym oknie jestem niedostępny
> 6. 14:30–15:15 — case study dla CEO na jutro (szablon: problem → rozwiązanie → wynik → next steps)
> 7. Literówkę w panelu ogarnę jak zostanie okno
>
> Jeśli coś pilnego — pingujcie, wyjdę z deep worku.

---

## Surowe Case Study (4 zdania)

Partner dostarczył eksport produktów z niespójnymi formatami cen, opisami w surowym HTML/JSON i brakującymi kodami EAN — ręczne czyszczenie takiego pliku dla katalogu 500+ SKU to kilka godzin pracy i gwarancja błędów. Marketplace AI-Fixer automatycznie normalizuje wymiary, kolory i ceny, czyści opisy z warstwy technicznej, waliduje EAN-y i generuje gotowe tytuły sprzedażowe na Allegro — cały proces trwa sekundy. Narzędzie eliminuje powtarzalną pracę ręczną: operator wrzuca plik i pobiera gotowy eksport z jawnie oznaczonymi problemami do rozwiązania. Przy typowym eksporcie 500–1000 SKU skraca czas przygotowania ofert z kilku godzin do minut i ogranicza ryzyko błędnych danych na marketplace.
