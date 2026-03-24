# Scenariusze Biznesowe + Case Study

---

## Zadanie 2: Kryzys API (Po gwarancji)

**Temat: Pilne — aktualizacja cen Amazon, plan działania**

Panie Marku,

Dostałem informację o problemie z synchronizacją cen na Amazonie. Rozumiem powagę sytuacji — każda godzina bez aktualnych cen to bezpośrednia strata na sprzedaży i wiem, że priorytetem jest jak najszybsze przywrócenie działania.

Wstępnie wygląda to na throttling po stronie Amazon API — prawdopodobnie przekroczony limit requestów na jednostkę czasu. To częsty problem przy większych katalogach i da się go rozwiązać.

Chcę być transparentny co do sytuacji formalnej: okres wsparcia w ramach wdrożenia zakończył się w styczniu, a projekt nie jest objęty abonamentem Managed Service. Nie mamy więc aktywnego mandatu do interwencji — ale rozumiem, że sytuacja jest pilna i nie chcę zostawiać Pana z tym problemem.

Proponuję dwa warianty:

1. **Interwencja awaryjna (jednorazowa)** — wchodzę w diagnozę i naprawę w trybie priorytetowym. Wycenę prześlę w ciągu godziny od potwierdzenia zlecenia. Typowo tego typu throttling rozwiązujemy w 2-4 godziny roboczych.

2. **Managed Service (rekomendacja)** — miesięczny abonament, w ramach którego monitorujemy system proaktywnie, reagujemy na incydenty w ramach SLA i optymalizujemy konfigurację na bieżąco. Dzięki temu tego typu sytuacje łapiemy zanim wpłyną na sprzedaż.

Proszę o krótki sygnał, którą ścieżką idziemy — jestem dostępny i mogę zacząć jeszcze dziś.

Pozdrawiam,
Eryk

---

## Zadanie 3: Konsultant vs Wykonawca

### 3 argumenty biznesowe, dlaczego adaptacja AI > kopiowanie 1:1:

**1. Niewidoczność = zero sprzedaży, mimo że płacisz za obecność**

eMAG ma własny algorytm rankingowy i własne wymagania co do struktury opisów. Opisy skopiowane 1:1 z Allegro nie trafiają w te wymagania — produkty lądują na 15. stronie wyników albo w ogóle poza nimi. Efekt: opłacasz prowizję za marketplace, na którym nikt Cię nie znajduje. Adaptacja AI sprawia, że opisy są zoptymalizowane pod eMAG od pierwszego dnia — widoczność od razu, nie po tygodniach poprawek.

**2. Rework kosztuje więcej niż zrobienie dobrze za pierwszym razem**

Kopiowanie 1:1 wygląda na tańszą opcję, ale prawie zawsze kończy się tym samym scenariuszem: po publikacji okazuje się, że wyniki są słabe, więc zaczyna się ręczne poprawianie ofert — edycja za edycją, reklamacja za reklamacją. Zespół płaci dwa razy: raz za kopiowanie, drugi raz za ratowanie jakości. Przy 500+ SKU te godziny reworku kosztują wielokrotnie więcej niż jednorazowa adaptacja AI.

**3. Jeden proces na wszystkie marketplace — skalowanie bez bólu**

Kopiowanie 1:1 nie skaluje się. eMAG to nie jedyny marketplace z własnymi wymaganiami — bol.com, Kaufland, OTTO, każdy ma inną strukturę. Budując proces adaptacji AI, budujemy powtarzalny model: dzisiaj dostosowujemy pod eMAG, jutro pod kolejny kanał, pojutrze pod następny — bez startowania od zera za każdym razem. Klient nie kupuje jednorazowego opisu. Kupuje przewidywalność i spokój przy ekspansji.

---

## Zadanie 4: CEO nie odbiera (Stress Test)

**Moja decyzja: wstrzymuję moduł cenowy.**

Uzasadnienie w jednym zdaniu: znana, ograniczona strata (brak aktualizacji cen w weekend) jest lepsza od niekontrolowanej, rosnącej straty (ciągła sprzedaż po złych cenach, gdzie każda minuta generuje realny minus).

### Moje kroki w ciągu 15 minut:

**Minuty 0-3: Rozpoznanie i skala**
- Sprawdzam ile produktów jest dotkniętych i jak duża jest różnica cenowa (czy to 5% niżej czy 50% niżej — to zmienia kalkulację ryzyka)
- Weryfikuję czy skrypt nadal aktywnie publikuje złe ceny, czy to jednorazowy batch
- Zbieram listę dotkniętych SKU na wypadek konieczności ręcznego rollbacku

**Minuty 3-5: Eskalacja na wszystkich kanałach**
- Ponawiam telefon do CEO i COO
- Jednocześnie: SMS do obu + wiadomość na Slack/Discord + krótki mail z tematem "PILNE — błąd cen, podjąłem działanie"
- Zapisuję notatkę: godzina, skala problemu, moja hipoteza przyczyny

**Minuty 5-10: Decyzja i egzekucja**
- Jeśli da się wyizolować sam moduł cenowy bez wyłączania reszty systemu — robię to (reszta sprzedaży idzie normalnie, tylko ceny się nie aktualizują)
- Jeśli nie da się izolować — wyłączam cały pipeline cenowy. Wiem, że to oznacza brak sprzedaży w weekend, ale to strata kontrolowana
- Nie próbuję naprawy na żywo, chyba że przyczyna jest trywialna i mam 100% pewność + gotowy rollback

**Minuty 10-15: Zabezpieczenie i dokumentacja**
- Wykonuję wybraną akcję, potwierdzam że zadziałała
- Dokumentuję: co zrobiłem, dlaczego, o której, jaki jest obecny status systemu
- Przygotowuję krótki plan przywrócenia — żeby po kontakcie z zarządem można było szybko podjąć następne kroki bez "a co się właściwie stało?"
- Zabezpieczam logi do analizy root cause

---

## Zadanie 5: Organizacja dnia

### Kolejność: 4 → 1 → 3 → 2 → 5

| Priorytet | Zadanie | Dlaczego tu |
|---|---|---|
| **1** | Wycena dla Sales (30 min) | Twardy deadline zewnętrzny — spotkanie o 14:00. Blokuje inną osobę. 30 minut pracy, ale zrobione rano daje 4 godziny buforu na ewentualne pytania |
| **2** | Bug kategoryzacji Klienta A | Klient czeka, realny problem, ale dotyczy 5% produktów — nie krytyczny. Triage + ETA rano, naprawa może iść równolegle z deep workiem |
| **3** | Deep Work — integracja Amazon (5h) | Największy blok, deadline środa. Po zamknięciu wyceny i triage'u mam czysty czas na skupienie |
| **4** | Case study dla CEO | Termin jutro rano — robię pod koniec dnia lub wieczorem. Nie wymaga deep focusu, mogę napisać na świeżo po dniu pracy |
| **5** | Literówka w panelu | Zero wpływu biznesowego, zero pilności. Wrzucam jeśli zostanie okno |

**Ważny niuans:** Zanim zacznę wycenę, w pierwszych 5 minutach dnia wysyłam Klientowi A szybki ack: "Widzę zgłoszenie, triage robię dziś rano, wrócę z ETA naprawy do południa." — 30 sekund pracy, a klient nie wisi bez odpowiedzi. To jest High Agency w praktyce.

### Morning Update na Discordzie (9:15):

> Cześć, plan na dziś:
>
> 1. Do ~10:00 — domykam wycenę dla Sales na spotkanie o 14:00
> 2. Triage błędu kategoryzacji u Klienta A → dam znać ETA naprawy do południa
> 3. Od ~10:30 blokuję się na deep work nad integracją Amazon (deadline: środa). Będę mniej responsywny na czacie — wracam w przerwach
> 4. 13:45-14:30 — spotkanie Sales (wycena), więc w tym oknie niedostępny
> 5. Pod koniec dnia przygotowuję surowe case study dla CEO na jutro
> 6. Literówkę w panelu ogarnę jak zostanie okno
>
> Jeśli coś pilnego — pingujcie, wyjdę z deep worku.

---

## Surowe Case Study (4 zdania)

Partner dostarczył eksport produktów z niespójnymi formatami cen, opisami w surowym HTML/JSON i brakującymi kodami EAN — ręczne czyszczenie takiego pliku dla katalogu 500+ SKU to kilka godzin pracy operatora i gwarancja błędów ludzkich. Marketplace AI-Fixer automatycznie normalizuje wymiary, kolory i ceny, czyści opisy z warstwy technicznej, waliduje EAN-y checksumą i generuje gotowe tytuły sprzedażowe zoptymalizowane pod Allegro — cały proces zajmuje sekundy zamiast godzin. Operator wrzuca plik, widzi w dashboardzie jawnie oznaczone problemy do rozwiązania (brakujące EAN-y, niedokładne stany magazynowe) i pobiera gotowy eksport do marketplace. Przy typowym eksporcie partnerskim (500-1000 SKU) narzędzie skraca czas przygotowania ofert z 4-6 godzin do kilku minut i eliminuje ryzyko publikacji ofert z błędnymi danymi.
