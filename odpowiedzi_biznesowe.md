# Scenariusze Biznesowe — Zadania 2–5 + Case Study

---

## Zadanie 2: Kryzys API (Po gwarancji)

**Temat: Pilne — aktualizacja cen Amazon, plan działania**

Panie [Imię],

Widzę problem z synchronizacją cen na Amazonie — rozumiem, że każda godzina bez aktualizacji to realna strata na sprzedaży i priorytetem jest jak najszybsze przywrócenie działania.

Po wstępnej analizie wygląda to na throttling po stronie Amazon API, prawdopodobnie związany z limitem requestów.

Muszę być transparentny: okres wsparcia w ramach wdrożenia zakończył się dwa miesiące temu, a projekt nie jest objęty abonamentem Managed Service, więc formalnie nie mamy aktywnego mandatu do interwencji.

Żeby nie tracić czasu, proponuję dwie ścieżki:

1. **Interwencja awaryjna (jednorazowa)** — diagnoza i naprawa w trybie priorytetowym. Wycenę prześlę w ciągu godziny po potwierdzeniu zlecenia.

2. **Managed Service (rekomendacja na przyszłość)** — miesięczny abonament obejmujący monitoring, reakcję na incydenty i proaktywną optymalizację, żeby taka sytuacja się nie powtórzyła.

Proszę o krótką informację, którą ścieżką idziemy — mogę zacząć jeszcze dziś.

Pozdrawiam,
[Imię]

---

## Zadanie 3: Konsultant vs Wykonawca

### 3 argumenty biznesowe za adaptacją AI zamiast kopiowania 1:1

**Argument 1: Utracony przychód z niskiej widoczności**
eMAG ma własny algorytm rankingowy. Opisy skopiowane 1:1 z Allegro nie trafiają w jego wymagania — produkty lądują nisko w wynikach lub poza nimi. To znaczy: płacisz za obecność na marketplace, ale nikt Cię nie widzi. Adaptacja AI to różnica między "jesteś na eMAG" a "sprzedajesz na eMAG".

**Argument 2: Koszt reworku jest wyższy niż koszt adaptacji**
Tania ścieżka prawie zawsze kończy się poprawkami po publikacji: ręczne edycje, reklamacje, kolejne iteracje. Zespół płaci dwa razy — raz za kopiowanie, drugi raz za ratowanie jakości. Jednorazowa adaptacja AI kosztuje mniej niż powtarzany rework na setkach produktów.

**Argument 3: Skalowalność na przyszłość**
Kopiowanie 1:1 nie skaluje się. Każdy nowy marketplace (bol.com, Kaufland, OTTO) ma inne wymagania. Proces adaptacji AI buduje powtarzalny model: dzisiaj eMAG, jutro kolejne kanały bez gaszenia pożarów od zera. Klient kupuje nie opis — kupuje przewidywalność.

---

## Zadanie 4: CEO nie odbiera (Stress Test)

**Decyzja: Wstrzymuję system cenowy.**

### Kroki w ciągu 15 minut:

**Minuty 0–3: Rozpoznanie**
- Potwierdzam skalę: ile produktów dotkniętych, jak duża różnica cenowa
- Sprawdzam czy problem nadal aktywnie publikuje złe ceny
- Zbieram listę dotkniętych SKU

**Minuty 3–5: Eskalacja**
- Telefon do CEO i COO (powtórzony dwukrotnie)
- SMS + wiadomość na Slacku/Discordzie/mailu: "PILNE — błąd marży na 100 produktach, podejmuję decyzję o wstrzymaniu systemu cenowego, oddzwońcie"
- Notatka z godziną, skalą i hipotezą przyczyny

**Minuty 5–10: Decyzja**
- Brak pewnej poprawki w krótkim czasie → wyłączam wadliwy proces cenowy
- Jeśli da się izolować tylko moduł cenowy bez zatrzymywania reszty sprzedaży — izoluję
- Jeśli nie — wstrzymuję cały system

**Minuty 10–15: Zabezpieczenie**
- Wykonuję wybraną akcję
- Dokumentuję: co zrobiłem, dlaczego, jaki jest status
- Przygotowuję plan przywrócenia na moment kontaktu z zarządem

**Uzasadnienie:** Kontynuowanie sprzedaży po zaniżonych cenach generuje realną, rosnącą stratę. Brak sprzedaży w weekend to strata znana i ograniczona. Pełna dokumentacja pozwoli szybko przywrócić działanie po kontakcie z zespołem zarządzającym. Zasada: najpierw ogranicz szkody, potem naprawiaj.

---

## Zadanie 5: Organizacja Dnia

### Kolejność: 4 → 1 → 3 → 2 → 5

| Priorytet | Zadanie | Dlaczego |
|-----------|---------|----------|
| **1.** | 4 — Wycena dla Sales | Twardy deadline zewnętrzny (spotkanie 14:00), 30 min pracy, blokuje inną osobę |
| **2.** | 1 — Bug kategoryzacji klienta A | Klient czeka, realny problem (5% produktów), najpierw triage i ETA |
| **3.** | 3 — Deep Work Amazon | Najdłuższy blok, deadline środa. Po zamknięciu 4 i 1 mam spokój na skupienie |
| **4.** | 2 — Case study dla CEO | Termin jutro rano — zrobię pod koniec dnia. Nie wymaga deep focusu |
| **5.** | 5 — Literówka | Zero wpływu biznesowego, wrzucam jak zostanie czas |

**Niuans:** Zanim zacznę wycenę, w pierwszych 5 minutach wyślę Klientowi A szybki ack: "Widzę zgłoszenie, triage robię dziś rano, wrócę z ETA" — żeby nie wisiał bez odpowiedzi.

### Morning Update na Discordzie (9:15):

> Cześć, plan na dziś:
>
> 1. Do ~10:00 — domykam wycenę dla Sales na spotkanie o 14:00
> 2. Triage błędu kategoryzacji u Klienta A → dam znać ETA naprawy do południa
> 3. Od ~10:30 blokuję się na deep work nad integracją Amazon (deadline: środa). Będę mniej responsywny na czacie — wracam w przerwach
> 4. 13:45–14:30 — spotkanie z Sales (wycena), więc w tym oknie jestem niedostępny
> 5. Pod koniec dnia przygotowuję surowe case study dla CEO na jutro
> 6. Literówkę w panelu ogarnę jak zostanie okno
>
> Jeśli coś pilnego — pingujcie, wyjdę z deep worku.

---

## Surowe Case Study (4 zdania)

Partner dostarczył eksport produktów z niespójnymi formatami cen, opisami w surowym HTML/JSON i brakującymi kodami EAN — ręczne czyszczenie takiego pliku dla katalogu 500+ SKU to kilka godzin pracy i gwarancja błędów. Marketplace AI-Fixer automatycznie normalizuje wymiary, kolory i ceny, czyści opisy z warstwy technicznej, waliduje EAN-y i generuje gotowe tytuły sprzedażowe na Allegro — cały proces trwa sekundy. Narzędzie eliminuje powtarzalną pracę ręczną: operator wrzuca plik i pobiera gotowy eksport z jawnie oznaczonymi problemami do rozwiązania. Przy typowym eksporcie 500–1000 SKU skraca czas przygotowania ofert z kilku godzin do minut i ogranicza ryzyko błędnych danych na marketplace.
