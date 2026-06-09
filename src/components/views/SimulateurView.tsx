"use client";

import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { NoteField, parseNote } from "@/components/NoteField";
import { SelectField, type Option } from "@/components/SelectField";
import { ResultGroup } from "@/components/ResultGroup";
import { Disclaimer } from "@/components/Disclaimer";
import { ShareButton } from "@/components/ShareButton";
import { AdSlot } from "@/components/AdSlot";
import { TargetIcon, ArrowRightIcon, SearchIcon, MapPinIcon } from "@/components/icons";
import { FILIERES, filiereLabel } from "@/lib/filieres";
import { simuler, normalizeVille } from "@/lib/admission";
import { formatNote } from "@/lib/calcul";
import etablissements from "@/data/etablissements.json";
import type { Etablissement, ResultatMatch } from "@/lib/types";

const DATA = etablissements as unknown as Etablissement[];

// Unique sorted list of cities for the optional filter.
const VILLES = Array.from(new Set(DATA.map((e) => e.ville))).sort((a, b) =>
  a.localeCompare(b, "fr")
);

// Groups in display order (seuilInconnu kept as a small extra near the end).
const GROUP_KEYS = [
  "convocable",
  "limite",
  "accesOuvert",
  "selectionDossier",
  "seuilInconnu",
  "enDessous",
  "horsPreselection",
] as const;

export function SimulateurView() {
  const { t, lang } = useLang();

  const [moyenne, setMoyenne] = useState("");
  const [filiere, setFiliere] = useState("");
  const [ville, setVille] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showOtherCities, setShowOtherCities] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read shareable/calculator params from the URL on first mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const m = params.get("moyenne");
    const f = params.get("filiere");
    const v = params.get("ville");
    if (m) setMoyenne(m.replace(".", ","));
    if (f && FILIERES.some((x) => x.code === f)) setFiliere(f);
    if (v) setVille(v);
    if (m && f) setSubmitted(true);
  }, []);

  const filiereOptions: Option[] = useMemo(
    () => FILIERES.map((f) => ({ value: f.code, label: `${filiereLabel(f.code, lang)} (${f.code})` })),
    [lang]
  );
  const villeOptions: Option[] = useMemo(() => VILLES.map((v) => ({ value: v, label: v })), []);

  const moyenneNum = parseNote(moyenne);

  const results = useMemo(() => {
    if (!submitted || moyenneNum === null || !filiere) return null;
    return simuler(DATA, moyenneNum, filiere);
  }, [submitted, moyenneNum, filiere]);

  // City filtering (real filter, not just a boost).
  const cityNorm = ville ? normalizeVille(ville) : "";
  const inCity = (r: ResultatMatch) => normalizeVille(r.etablissement.ville) === cityNorm;

  const cityCount = useMemo(() => {
    if (!results || !cityNorm) return 0;
    return GROUP_KEYS.reduce(
      (n, k) => n + results[k].filter((r) => normalizeVille(r.etablissement.ville) === cityNorm).length,
      0
    );
  }, [results, cityNorm]);
  const otherCount = results && cityNorm ? results.totalMatchFiliere - cityCount : 0;

  /** Apply the city filter to a group: only-this-city by default, or all (city first). */
  function applyCity(items: ResultatMatch[]): ResultatMatch[] {
    if (!cityNorm) return items;
    if (showOtherCities) {
      return [...items].sort((a, b) => (inCity(a) ? 0 : 1) - (inCity(b) ? 0 : 1));
    }
    return items.filter(inCity);
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (moyenneNum === null) return setError(t("sim.needMoyenne"));
    if (!filiere) return setError(t("sim.needFiliere"));
    setError(null);
    setSubmitted(true);
    setShowOtherCities(false);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("moyenne", String(moyenneNum));
      params.set("filiere", filiere);
      if (ville) params.set("ville", ville);
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
  }

  const hasAnyMatch = results && results.totalMatchFiliere > 0;
  // City chosen, nothing in it, and the user hasn't expanded to other cities.
  const cityEmpty = !!cityNorm && cityCount === 0 && !showOtherCities;

  return (
    <div className="container-page py-8 sm:py-12">
      <PageHeader title={t("sim.title")} subtitle={t("sim.subtitle")} icon={<TargetIcon className="h-6 w-6" />} />

      {/* Inputs */}
      <form onSubmit={handleSubmit} className="card p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <NoteField
            label={t("sim.input.moyenne")}
            help={t("sim.input.moyenne.help")}
            value={moyenne}
            onChange={(v) => {
              setMoyenne(v);
              setSubmitted(false);
            }}
            placeholder="ex. 15,40"
          />
          <SelectField
            label={t("sim.input.filiere")}
            value={filiere}
            onChange={(v) => {
              setFiliere(v);
              setSubmitted(false);
            }}
            options={filiereOptions}
            placeholder={t("sim.input.filiere.placeholder")}
          />
          <SelectField
            label={t("sim.input.ville")}
            value={ville}
            onChange={(v) => {
              setVille(v);
              setSubmitted(false);
              setShowOtherCities(false);
            }}
            options={villeOptions}
            placeholder={t("sim.input.ville.all")}
          />
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm font-medium text-rose-600 dark:text-rose-400">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary mt-5 w-full py-3.5 text-base sm:w-auto">
          {t("sim.cta")}
          <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
        </button>
      </form>

      {/* Results */}
      <div className="mt-8">
        {!results ? (
          <EmptyState />
        ) : !hasAnyMatch ? (
          <NoMatchState />
        ) : (
          <div className="space-y-8">
            {/* Summary + share */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base text-slate-700 dark:text-slate-200">
                {t("sim.summary", {
                  moyenne: formatNote(moyenneNum, lang),
                  filiere: filiereLabel(filiere, lang),
                })}
              </p>
              <ShareButton className="shrink-0" />
            </div>

            {/* City filter bar */}
            {cityNorm && (
              <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-800/40">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <MapPinIcon className="h-4 w-4 text-brand-500" />
                  {t("sim.city.count", { n: cityCount, ville })}
                </span>
                {otherCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowOtherCities((v) => !v)}
                    className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
                  >
                    {showOtherCities ? t("sim.city.hideOthers") : t("sim.city.showOthers")}
                  </button>
                )}
              </div>
            )}

            <Disclaimer />

            {cityEmpty ? (
              <CityEmptyState ville={ville} onShowOthers={() => setShowOtherCities(true)} canShowOthers={otherCount > 0} />
            ) : (
              <div className="space-y-8">
                <ResultGroup statut="convocable" items={applyCity(results.convocable)} titleKey="group.convocable" descKey="group.convocable.desc" />
                <ResultGroup statut="limite" items={applyCity(results.limite)} titleKey="group.limite" descKey="group.limite.desc" />

                <AdSlot slot="sim-between-groups" />

                <ResultGroup statut="accesOuvert" items={applyCity(results.accesOuvert)} titleKey="group.accesOuvert" descKey="group.accesOuvert.desc" />
                <ResultGroup statut="selectionDossier" items={applyCity(results.selectionDossier)} titleKey="group.selectionDossier" descKey="group.selectionDossier.desc" />
                <ResultGroup statut="seuilInconnu" items={applyCity(results.seuilInconnu)} titleKey="group.seuilInconnu" descKey="group.seuilInconnu.desc" />
                <ResultGroup statut="enDessous" items={applyCity(results.enDessous)} titleKey="group.enDessous" descKey="group.enDessous.desc" collapsible />
                <ResultGroup statut="horsPreselection" items={applyCity(results.horsPreselection)} titleKey="group.horsPreselection" descKey="group.horsPreselection.desc" collapsible />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  const { t } = useLang();
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
        <TargetIcon className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{t("sim.empty.title")}</h2>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{t("sim.empty.desc")}</p>
    </div>
  );
}

function NoMatchState() {
  const { t } = useLang();
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
        <SearchIcon className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{t("sim.noMatch.title")}</h2>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{t("sim.noMatch.desc")}</p>
    </div>
  );
}

function CityEmptyState({
  ville,
  onShowOthers,
  canShowOthers,
}: {
  ville: string;
  onShowOthers: () => void;
  canShowOthers: boolean;
}) {
  const { t } = useLang();
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
        <MapPinIcon className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
        {t("sim.city.empty.title", { ville })}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{t("sim.city.empty.desc")}</p>
      {canShowOthers && (
        <button type="button" onClick={onShowOthers} className="btn-primary mt-5">
          {t("sim.city.showOthers")}
        </button>
      )}
    </div>
  );
}
