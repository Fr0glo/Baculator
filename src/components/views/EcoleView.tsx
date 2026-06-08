"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { Disclaimer } from "@/components/Disclaimer";
import { EstimeBadge } from "@/components/EstimeBadge";
import { SeuilHistory } from "@/components/SeuilHistory";
import { AdSlot } from "@/components/AdSlot";
import { ShareButton } from "@/components/ShareButton";
import { ArrowRightIcon, ExternalIcon, MapPinIcon } from "@/components/icons";
import { filiereLabel } from "@/lib/filieres";
import { formatNote } from "@/lib/calcul";
import type { Etablissement } from "@/lib/types";

export function EcoleView({ etab }: { etab: Etablissement }) {
  const { t, lang } = useLang();

  const seuilDisplay = etab.accesOuvert
    ? t("card.openAccess")
    : etab.seuil2025 !== null
      ? `${formatNote(etab.seuil2025, lang)}/20`
      : t("card.noSeuil");

  // Prefill the simulator where we can: always the city, and the filière when
  // the school accepts exactly one concrete track.
  const concrete = etab.filieres.filter((f) => f !== "ALL");
  const simParams = new URLSearchParams();
  if (etab.ville) simParams.set("ville", etab.ville);
  if (concrete.length === 1) simParams.set("filiere", concrete[0]);
  const simHref = `/simulateur${simParams.toString() ? `?${simParams}` : ""}`;

  const infos: { label: string; value: string }[] = [
    { label: t("ecole.university"), value: etab.universite || "—" },
    { label: t("ecole.access"), value: etab.typeAcces || "—" },
    {
      label: t("ecole.secteur"),
      value: etab.secteur === "Public" ? t("explore.secteur.public") : t("explore.secteur.prive"),
    },
    { label: t("ecole.domaine"), value: etab.domaine },
  ];

  return (
    <div className="container-page py-8 sm:py-12">
      <Link
        href="/explorer"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
      >
        <ArrowRightIcon className="h-4 w-4 rotate-180 rtl:rotate-0" />
        {t("ecole.back")}
      </Link>

      <div className="mx-auto mt-4 max-w-3xl">
        {/* Header */}
        <header className="animate-fade-up">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {etab.nom}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-500 dark:text-slate-400">
            {etab.sigle && <span className="font-semibold">{etab.sigle}</span>}
            <span className="inline-flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" />
              {etab.ville}
            </span>
          </div>
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
        </header>

        {/* Seuil highlight */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-5 py-4 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {t("card.seuil")}
            </span>
            <span className="text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white">
              {seuilDisplay}
            </span>
            {etab.seuilEstime && !etab.accesOuvert && etab.seuil2025 !== null && <EstimeBadge />}
          </div>
          <ShareButton />
        </div>

        {/* History */}
        <div className="card mt-4 p-5">
          <SeuilHistory etab={etab} />
          {etab.seuil2023 === null && etab.seuil2024 === null && etab.seuil2025 === null && (
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("card.noSeuil")}</p>
          )}
        </div>

        {/* Informations + tracks */}
        <div className="card mt-4 p-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">{t("ecole.infos")}</h2>
          <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {infos.map((row) => (
              <div key={row.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{row.label}</dt>
                <dd className="text-sm text-slate-700 dark:text-slate-200">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{t("card.tracks")}</p>
            <div className="flex flex-wrap gap-1.5">
              {etab.filieres.map((f) => (
                <span key={f} className="chip">
                  {filiereLabel(f, lang)}
                </span>
              ))}
            </div>
          </div>

          {etab.notes && (
            <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
              {etab.notes}
            </p>
          )}

          {etab.site && (
            <a
              href={etab.site}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:text-brand-700 dark:text-brand-400"
            >
              {t("card.site")} <ExternalIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* CTA */}
        <Link href={simHref} className="btn-primary mt-6 w-full py-3.5 text-base">
          {t("ecole.cta")}
          <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
        </Link>

        <div className="mt-6">
          <Disclaimer />
        </div>

        <AdSlot slot="ecole-bottom" />
      </div>
    </div>
  );
}
