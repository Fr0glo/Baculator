"use client";

import { useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import type { ResultatMatch } from "@/lib/types";
import { EtablissementCard } from "./EtablissementCard";
import { ChevronDownIcon } from "./icons";
import type { DictKey } from "@/i18n/dictionary";

const TONE: Record<string, string> = {
  convocable: "text-brand-700 dark:text-brand-300",
  limite: "text-accent-700 dark:text-accent-300",
  accesOuvert: "text-sky-700 dark:text-sky-300",
  selectionDossier: "text-accent-700 dark:text-accent-300",
  horsPreselection: "text-violet-700 dark:text-violet-300",
  seuilInconnu: "text-slate-500 dark:text-slate-400",
  enDessous: "text-slate-500 dark:text-slate-400",
};

const DOT: Record<string, string> = {
  convocable: "bg-brand-500",
  limite: "bg-accent-500",
  accesOuvert: "bg-sky-500",
  selectionDossier: "bg-accent-400",
  horsPreselection: "bg-violet-400",
  seuilInconnu: "bg-slate-400",
  enDessous: "bg-slate-300 dark:bg-slate-600",
};

/** A titled, optionally-collapsible group of result cards. */
export function ResultGroup({
  statut,
  items,
  titleKey,
  descKey,
  collapsible = false,
}: {
  statut: keyof typeof TONE;
  items: ResultatMatch[];
  titleKey: DictKey;
  descKey: DictKey;
  collapsible?: boolean;
}) {
  const { t } = useLang();
  // Collapsed by default when collapsible (used for "En dessous").
  const [open, setOpen] = useState(!collapsible);

  if (items.length === 0) return null;

  return (
    <section className="animate-fade-up">
      <button
        type="button"
        onClick={() => collapsible && setOpen((v) => !v)}
        className={`flex w-full items-center gap-3 ${collapsible ? "cursor-pointer" : "cursor-default"}`}
        aria-expanded={collapsible ? open : undefined}
      >
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${DOT[statut]}`} aria-hidden="true" />
        <div className="min-w-0 flex-1 text-start">
          <h2 className={`flex items-center gap-2 text-lg font-extrabold tracking-tight ${TONE[statut]}`}>
            {t(titleKey)}
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {items.length}
            </span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t(descKey)}</p>
        </div>
        {collapsible && (
          <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {open && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((r) => (
            <EtablissementCard
              key={r.etablissement.id}
              etab={r.etablissement}
              statut={r.statut}
              marge={r.marge}
              seuilApplique={r.seuilApplique}
              trackSeuil={r.trackSeuil}
            />
          ))}
        </div>
      )}
    </section>
  );
}
