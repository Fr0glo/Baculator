"use client";

import { useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import type { EligibiliteStatut, Etablissement } from "@/lib/types";
import { filiereLabel } from "@/lib/filieres";
import { formatNote } from "@/lib/calcul";
import { EstimeBadge } from "./EstimeBadge";
import {
  ChevronDownIcon,
  ExternalIcon,
  MapPinIcon,
} from "./icons";

// Per-status accent colour for the left rail + margin pill.
const STATUT_STYLES: Record<
  EligibiliteStatut,
  { rail: string; pill: string }
> = {
  convocable: {
    rail: "bg-brand-500",
    pill: "bg-brand-100 text-brand-800 dark:bg-brand-500/15 dark:text-brand-300",
  },
  limite: {
    rail: "bg-accent-500",
    pill: "bg-accent-100 text-accent-800 dark:bg-accent-500/15 dark:text-accent-200",
  },
  accesOuvert: {
    rail: "bg-sky-500",
    pill: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
  },
  seuilInconnu: {
    rail: "bg-slate-400",
    pill: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  },
  enDessous: {
    rail: "bg-slate-300 dark:bg-slate-600",
    pill: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  },
};

export function EtablissementCard({
  etab,
  statut,
  marge,
}: {
  etab: Etablissement;
  /** Present in the simulator; omitted in the neutral explorer view. */
  statut?: EligibiliteStatut;
  marge?: number | null;
}) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);

  const style = statut ? STATUT_STYLES[statut] : null;

  const seuilDisplay = etab.accesOuvert
    ? t("card.openAccess")
    : etab.seuil2025 !== null
      ? `${formatNote(etab.seuil2025, lang)}/20`
      : t("card.noSeuil");

  return (
    <article
      className={`card relative overflow-hidden animate-fade-up ${
        style ? "ps-3" : ""
      }`}
    >
      {style && (
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 start-0 w-1.5 ${style.rail}`}
        />
      )}

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-white">
              {etab.nom}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
              {etab.sigle && <span className="font-semibold">{etab.sigle}</span>}
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="h-3.5 w-3.5" />
                {etab.ville}
              </span>
            </div>
          </div>

          {/* Margin pill (simulator only, numeric seuils) */}
          {statut && marge !== null && marge !== undefined && (
            <span
              className={`badge shrink-0 px-2.5 py-1 text-xs font-bold tabular-nums ${style?.pill}`}
              title={t("card.marge")}
            >
              {marge >= 0 ? "+" : ""}
              {formatNote(marge, lang)}
            </span>
          )}
        </div>

        {/* Meta chips */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="chip">{etab.domaine}</span>
          <span className="chip">
            {etab.secteur === "Public" ? t("explore.secteur.public") : t("explore.secteur.prive")}
          </span>
          {etab.places !== null && (
            <span className="chip tabular-nums">
              {etab.places.toLocaleString(lang === "ar" ? "ar-MA" : "fr-MA")} {t("card.places")}
            </span>
          )}
        </div>

        {/* Seuil row */}
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {t("card.seuil")}
            </span>
            <span className="text-base font-bold tabular-nums text-slate-900 dark:text-white">
              {seuilDisplay}
            </span>
            {etab.seuilEstime && !etab.accesOuvert && etab.seuil2025 !== null && <EstimeBadge />}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-brand-600 transition hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-500/10"
            aria-expanded={open}
          >
            {t("card.details")}
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Expandable details */}
        {open && (
          <div className="mt-4 animate-fade-in space-y-4 border-t border-slate-100 pt-4 dark:border-slate-800">
            <SeuilHistory etab={etab} />

            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t("card.tracks")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {etab.filieres.map((f) => (
                  <span key={f} className="chip">
                    {filiereLabel(f, lang)}
                  </span>
                ))}
              </div>
            </div>

            {etab.notes && (
              <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
                {etab.notes}
              </p>
            )}

            {etab.site && (
              <a
                href={etab.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400"
              >
                {t("card.site")} <ExternalIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/** Tiny 3-year seuil history as horizontal bars (pure CSS, no chart lib). */
function SeuilHistory({ etab }: { etab: Etablissement }) {
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
