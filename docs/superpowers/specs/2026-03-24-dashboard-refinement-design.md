# Dashboard Refinement Design — Marketplace AI-Fixer

> Zatwierdzone przez użytkownika 2026-03-24. Projekt obejmuje ulepszenia UI oraz 3 twisty dodatkowe.

## Kontekst

Mamy działający dashboard (Next.js 16 + shadcn/ui + Tailwind v4) z pipeline'em czyszczenia danych, tabelą produktów, eksportem Excel/CSV i panelem szczegółów. Celem jest dopracowanie UI do poziomu profesjonalnego narzędzia oraz dodanie 3 twistów wyróżniających.

## Zakres

### Must-have (ulepszenia istniejącego)

- Dual theme: light + dark z toggle i płynną animacją (`transition-colors duration-150`)
- Indigo jako kolor akcentowy (CTA, aktywne zakładki, hover, badge valid)
- Przeprojektowane karty statusowe, tabela, badge'e pod nowy color scheme
- State refactor: produkty jako React state zamiast statycznego importu (potrzebne do drag & drop)

### Twist 1: Podgląd mockupu Allegro

- Nowa zakładka "Podgląd Allegro" w detail sheet (Sheet component)
- Mockup karty produktowej:
  - Placeholder image 200x200
  - Tytuł Allegro (bold)
  - Cena + stan magazynowy
  - Parametry: kolor, wymiary, materiał (wyciągany z `opis_czysty` — patrz sekcja "Ekstrakcja materiału")
  - Opis oczyszczony
  - EAN z badge statusu
- Styl: biały card z cieniami (nawet w dark mode — Allegro jest jasne), `border-slate-200`

### Twist 2: Drag & Drop JSON

- Header pełni rolę drop zone
- Stan domyślny: subtelny tekst "lub przeciągnij plik JSON" + ikona upload, `opacity-40`
- Dragover: `border-2 border-dashed border-indigo-500`, tekst "Upuść plik JSON", `bg-indigo-500/5`
- Po upuszczeniu: walidacja JSON → `processProducts()` → state update
- Błędny plik: krótkotrwały alert "Nieprawidłowy format JSON"
- Demo dane jako initial state — drop zastępuje
- **Eksport po drop:** ExportButtons generują Excel/CSV client-side z aktualnego state (nie z API route). Używamy dynamicznego importu `exceljs` w przeglądarce. API route `/api/export` zostaje jako fallback dla initial demo data.

### Twist 3: Historia zmian

- Nowa zakładka **"Historia zmian"** wewnątrz sekcji Before/After tabs (4. zakładka obok "Po czyszczeniu", "Dane surowe", "Porównanie")
- Lista per-produkt, per-pole:
  - Pole → wartość przed → wartość po → uzasadnienie zmiany
  - Badge: `zmieniono` (indigo) | `bez zmian` (muted) | `problem` (red)
- Nowa funkcja `generateChangeLog(raw, clean)` w `lib/data-processor.ts`

## Architektura

### Struktura komponentów

```
src/
├── app/
│   ├── page.tsx                    # Server Component: ładuje demo dane, przekazuje jako initialProducts/initialRawProducts do Dashboard
│   └── api/export/route.ts         # Server-side Excel/CSV dla demo data (fallback)
├── components/dashboard/
│   ├── dashboard.tsx               # Główny layout, useState(initialProducts), drag & drop logic, przekazuje settery do header
│   ├── header.tsx                  # NOWY: layout: [tytuł | drop hint (środek) | eksport + theme toggle (prawa)]
│   ├── theme-toggle.tsx            # NOWY: icon-only button (prawa strona header, przed eksportem), sun→moon rotate animation
│   ├── status-cards.tsx            # Karty statusowe (styl: indigo accents)
│   ├── product-table.tsx           # Tabela (styl: indigo hover)
│   ├── product-detail-sheet.tsx    # REFACTOR: dodaj zakładkę Allegro preview
│   ├── allegro-preview.tsx         # NOWY: mockup karty Allegro
│   ├── before-after-tabs.tsx       # REFACTOR: dodaj 4. zakładkę "Historia zmian"
│   ├── change-history.tsx          # NOWY: changelog content (renderowany wewnątrz tabs)
│   ├── export-buttons.tsx          # REFACTOR: przyjmuje products prop, client-side export z dynamic import exceljs
│   ├── ean-badge.tsx               # Styl update (indigo for valid)
│   └── stock-badge.tsx             # Styl update
├── lib/
│   ├── data-processor.ts           # ROZSZERZENIE: + generateChangeLog() + extractMaterial()
│   └── types.ts                    # ROZSZERZENIE: + ChangeLogEntry, + material field w CleanProduct
└── data/
    └── partner_export_dirty.json   # Demo dane
```

### Theme System

- Użyj **`next-themes`** (standard dla Next.js + shadcn/ui) — rozwiązuje FOUC, SSR, localStorage, `prefers-color-scheme` out of the box
- Class-based dark mode: `<html class="dark">`
- `ThemeProvider` w `layout.tsx` z `attribute="class"` i `defaultTheme="system"`
- Theme toggle: icon-only Button (ghost variant), `Sun`/`Moon` z lucide-react, `rotate-0 → rotate-90` transition na ikonie
- CSS: `transition-colors duration-150` na poszczególnych kontenerach (nie na body — unikamy repaint całej strony)

### CSS Variables (indigo accent)

```css
/* Light mode */
:root {
  --primary: oklch(0.585 0.233 264);          /* indigo-500 */
  --primary-foreground: oklch(0.985 0 0);     /* white */
  --ring: oklch(0.585 0.233 264);             /* indigo-500 */
  --accent: oklch(0.962 0.018 264);           /* indigo-50 */
  --accent-foreground: oklch(0.337 0.166 264); /* indigo-900 */
  /* reszta zmiennych bez zmian (neutral/slate) */
}

/* Dark mode */
.dark {
  --primary: oklch(0.673 0.233 264);          /* indigo-400 */
  --primary-foreground: oklch(0.205 0 0);     /* near-black */
  --ring: oklch(0.673 0.233 264);             /* indigo-400 */
  --accent: oklch(0.257 0.09 264);            /* indigo-950-ish */
  --accent-foreground: oklch(0.87 0.065 264); /* indigo-200 */
}
```

### State Management

```typescript
// page.tsx (Server Component)
export default function Home() {
  const rawProducts = rawData as RawProduct[];
  const cleanProducts = processProducts(rawProducts);
  return <Dashboard initialProducts={cleanProducts} initialRawProducts={rawProducts} />;
}

// dashboard.tsx (Client Component)
const [products, setProducts] = useState<CleanProduct[]>(initialProducts);
const [rawProducts, setRawProducts] = useState<RawProduct[]>(initialRawProducts);

async function handleFileDrop(file: File) {
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    // Walidacja: musi być tablica z wymaganymi polami
    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("Plik musi zawierać niepustą tablicę produktów");
    }
    const requiredFields = ["NAZWA ORG", "SKU", "Cena", "Opis ofe", "Stany", "EAN"];
    const missingFields = requiredFields.filter(f => !(f in parsed[0]));
    if (missingFields.length > 0) {
      throw new Error(`Brakujące pola: ${missingFields.join(", ")}`);
    }
    const cleaned = processProducts(parsed as RawProduct[]);
    setRawProducts(parsed);
    setProducts(cleaned);
  } catch (err) {
    // Pokaż alert z err.message
  }
}
```

### Ekstrakcja materiału (dla Allegro preview)

Nowe pole `material: string | null` w `CleanProduct`. Ekstrakcja w `data-processor.ts`:

```typescript
function extractMaterial(description: string): string | null {
  const patterns = [
    /100%\s+(poliester|bawełna|PES|nylon|akryl|wiskoza)/i,
    /materiał[:\s]+([\w%\s]+?)(?:\.|,|$)/i,
    /skład[:\s]+([\w%\s]+?)(?:\.|,|$)/i,
  ];
  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match) return match[0].trim();
  }
  return null;
}
```

### ChangeLog Type

```typescript
type ChangeType = "changed" | "unchanged" | "problem";

type ChangeLogEntry = {
  sku: string;
  fields: {
    field: string;
    before: string;
    after: string;
    type: ChangeType;
    reason: string;
  }[];
};
```

### Drag & Drop walidacja

| Scenariusz | Zachowanie |
|-----------|-----------|
| Poprawny JSON `RawProduct[]` | Parse → process → state update |
| Parseable JSON ale nie tablica | Alert: "Plik musi zawierać tablicę produktów" |
| Tablica ale brak wymaganych pól | Alert: "Brakujące pola: X, Y" |
| Pusta tablica | Alert: "Plik musi zawierać niepustą tablicę produktów" |
| Nieparseable / nie-JSON | Alert: "Nieprawidłowy format JSON" |
| Plik nie `.json` | Ignoruj (nie reaguj na drop) |

## Poza zakresem

- Auth, baza danych, wieloużytkownikowość
- Integracje z prawdziwymi marketplace'ami
- Testy E2E (unit testy pipeline'u rekomendowane ale nie wymagane)
- i18n — interfejs tylko po polsku

## Kolejność implementacji

1. `next-themes` + CSS variables (indigo accent, theme toggle, FOUC prevention)
2. State refactor (useState zamiast static import, page.tsx → initial props)
3. Header refactor (wyciągnięcie do osobnego komponentu, layout)
4. Drag & drop (header as drop zone, walidacja, alert)
5. ExportButtons refactor (client-side export z aktualnego state)
6. `extractMaterial()` + `material` field w CleanProduct
7. Podgląd Allegro (zakładka w detail sheet)
8. `generateChangeLog()` + Historia zmian (zakładka w before/after tabs)
9. Polish: badge colors, hover states, spacing, transitions
