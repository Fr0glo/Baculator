"use client";

import { useLang } from "@/i18n/LanguageProvider";
import { formatNote } from "@/lib/calcul";
import type { Etablissement } from "@/lib/types";

/** Tiny 3-year seuil history as horizontal bars (pure CSS, no chart lib). */
export function SeuilHistory({ etab }: { etab: Etablissement }) {
  const { t, lang } = useLang();
  const years: { year: string; value: number | null }[] = [
    { year: "2023", value: etab.seuil2023 },
    { year: "2024", value: etab.seuil2024 },
    { year: "2025", value: etab.seuil2025 },
  ];
  const known = years.filter((y) => y.value !== null);
  if (known.length === 0) return null;

  // Scale bars relative to 20 but zoom into the 10–20 band for readability.
  const min = 10;
  const pct = (v: number) => Math.max(4, ((v - min) / (20 - min)) * 100);

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {t("card.history")}
      </p>
      <div className="space-y-2">
        {years.map((y) => (
          <div key={y.year} className="flex items-center gap-3">
            <span className="w-10 shrink-0 text-xs font-medium tabular-nums text-slate-400">
              {y.year}
            </span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              {y.value !== null && (
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                  style={{ width: `${pct(y.value)}%` }}
                />
              )}
            </div>
            <span className="w-12 shrink-0 text-end text-xs font-bold tabular-nums text-slate-700 dark:text-slate-200">
              {y.value !== null ? formatNote(y.value, lang) : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
