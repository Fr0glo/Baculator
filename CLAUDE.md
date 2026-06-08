# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Bacullator** — a static, mobile-first, bilingual (FR default / AR with full RTL) site for Moroccan high-school students. Two core tools: a **moyenne calculator** (présélection vs Bac diploma averages) and an **admission simulator** ("which schools can I be convoked to?"). No backend; all data is bundled JSON.

## Commands

```bash
npm run dev      # local dev server (http://localhost:3000)
npm run build    # static export → ./out  (also runs lint + typecheck; must be 0 warnings)
npm run lint     # ESLint (next/core-web-vitals)
npm run data     # regenerate src/data/etablissements.json from data/Etablissements_Maroc_BAC.xlsx
```

There is no test runner. To sanity-check the pure logic in `src/lib/`, run a throwaway script with Node's native TS type-stripping (type-only imports are erased, so `admission.ts`/`calcul.ts` run directly):

```bash
node --experimental-strip-types ./_scratch.mjs   # import from './src/lib/calcul.ts' etc.
```

## Architecture

**Static export.** `next.config.mjs` sets `output: "export"` + `images.unoptimized` + `trailingSlash`. There is **no server at runtime** — avoid anything requiring one. In particular, `useSearchParams` is intentionally **not** used (it forces a Suspense boundary under export); read query params via `window.location` inside a `useEffect` instead (see `SimulateurView`).

**Page = server shell + client view.** Each route's `src/app/<route>/page.tsx` is a tiny **server** component that only exports `metadata` and renders a matching **client** component from `src/components/views/*View.tsx`. Reason: route metadata must be server-side, but every view needs hooks/i18n. Put UI logic in the `*View` files.

**Providers + no-flash.** `src/app/layout.tsx` wraps the app in `Providers` (`ThemeProvider` → `LanguageProvider`) and injects an inline `<script>` that applies the saved theme (`bac-theme`) and language/`dir` (`bac-lang`) from `localStorage` **before paint** to avoid a flash. The providers then sync React state with what the script already applied.

**i18n.** `src/i18n/dictionary.ts` is a flat `as const` dictionary keyed by id, each with `{ fr, ar }`. Use `const { t, lang, dir } = useLang()` and `t("some.key", { var })`. Adding UI text means adding a key here in **both** languages. School/establishment names stay verbatim (not translated).

**RTL is structural, not bolted on.** Switching to Arabic sets `<html dir="rtl">`. Layouts mirror **only** because we use Tailwind **logical** utilities — `ps-/pe-`, `ms-/me-`, `start-/end-`. Do **not** introduce physical-direction classes (`left-/right-/pl-/pr-/ml-/mr-/text-left/right`) or `dir="ltr"` on elements; that breaks the mirror (this was a real bug on the grade inputs). Use `rtl:` variants for one-off flips (e.g. `rtl:rotate-180` on arrows).

**Domain logic lives in `src/lib/`:**
- `calcul.ts` — the two averages students confuse: **présélection** `0.75·National + 0.25·Régional` (this is what seuils compare against and what feeds the simulator) and **Bac diploma** `0.25·Régional + 0.25·ContrôleContinu + 0.50·National`. Also the reverse helper: minimum National score to reach a Bac average of 10 (passing).
- `admission.ts` — `simuler()` / `evaluer()` classify each track-matching school into `convocable` / `limite` (within `LIMITE_MARGE = 0.5` below seuil) / `accesOuvert` / `seuilInconnu` / `enDessous`, then sort (margin desc; a preferred city boosts to the top of its group). `"ALL"` filière matches every track.

**Calculator → simulator handoff** is via URL query (`/simulateur?moyenne=X`), not shared state. `localStorage` is used **only** for convenience (language, theme, last calculator inputs) — never for core logic.

## Data pipeline (the part that matters most)

The owner maintains `data/Etablissements_Maroc_BAC.xlsx` (sheet `Etablissements`, gitignored). `scripts/xlsx-to-json.mjs` normalizes it into the committed `src/data/etablissements.json` (the `Etablissement[]` the app reads). If the xlsx is absent, the script **keeps the existing sample** so the build never breaks.

Seuil cell conventions the converter + UI must honor:
- plain number → known seuil; `≈14.2` → estimate (`seuilEstime`, shows a badge); `N/A` → `accesOuvert`; empty → `seuilInconnu` ("à vérifier").
- `Filieres Bac acceptees`: comma-separated track codes (`SM,PC,SVT,SAgr,STE,STM,SGC,SE,LSH`), or `Toutes filieres`/`Variable…` → `["ALL"]`.

JSON is imported as `as unknown as Etablissement[]` (the literal JSON type isn't directly assignable to the union types).

## Conventions / gotchas

- **Branding is centralized:** the name lives in `SITE.name` (`src/lib/site.ts`) and `app.name` (dictionary); also update `SITE.url` to the real domain before deploying (used for OG/canonical/sitemap), and `SITE.dataUpdated` for the footer date.
- **OG image** (`src/app/opengraph-image.tsx`, `next/og`) must use **Latin text only** — the default font crashes the build on Arabic ligatures/emoji. SEO files are Next file-conventions: `app/icon.svg`, `app/sitemap.ts`, `app/robots.ts`.
- **Ad slots** (`AdSlot`) are reserved empty placeholders only — do not add real AdSense scripts without the owner's go-ahead (wiring notes are in the component).
- **Trust copy is non-negotiable:** keep the disclaimer near results (`Disclaimer`) and the présélection-vs-Bac explanation intact; seuils are indicative/estimated and the official source is cursussup.gov.ma.

See `README.md` for the beginner-oriented deploy guide (Vercel + GitHub Student Pack domain) and data-update workflow.
