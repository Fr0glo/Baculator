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
import { TargetIcon, ArrowRightIcon, SearchIcon } from "@/components/icons";
import { FILIERES, filiereLabel } from "@/lib/filieres";
import { simuler } from "@/lib/admission";
import { formatNote } from "@/lib/calcul";
import etablissements from "@/data/etablissements.json";
import type { Etablissement } from "@/lib/types";

const DATA = etablissements as unknown as Etablissement[];

// Unique sorted list of cities for the optional preference dropdown.
const VILLES = Array.from(new Set(DATA.map((e) => e.ville))).sort((a, b) =>
  a.localeCompare(b, "fr")
);

export function SimulateurView() {
  const { t, lang } = useLang();

  const [moyenne, setMoyenne] = useState("");
  const [filiere, setFiliere] = useState("");
  const [ville, setVille] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Read shareable/calculator params from the URL on first mount.
  // (Done via window.location to avoid the Suspense requirement of
  // useSearchParams under `output: export`.)
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
  const villeOptions: Option[] = useMemo(
    () => VILLES.map((v) => ({ value: v, label: v })),
    []
  );

  const moyenneNum = parseNote(moyenne);

  const results = useMemo(() => {
    if (!submitted || moyenneNum === null || !filiere) return null;
    return simuler(DATA, moyenneNum, filiere, ville || null);
  }, [submitted, moyenneNum, filiere, ville]);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (moyenneNum === null) {
      setError(t("sim.needMoyenne"));
      return;
    }
    if (!filiere) {
      setError(t("sim.needFiliere"));
      return;
    }
    setError(null);
    setSubmitted(true);
    // Reflect state in the URL so results are shareable.
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("moyenne", String(moyenneNum));
      params.set("filiere", filiere);
      if (ville) params.set("ville", ville);
      window.history.replaceState(null, "", `?${params.toString()}`);
    }
  }

  const hasAnyMatch = results && results.totalMatchFiliere > 0;

  return (
    <div className="container-page py-8 sm:py-12">
      <PageHeader
        title={t("sim.title")}
        subtitle={t("sim.subtitle")}
        icon={<TargetIcon className="h-6 w-6" />}
      />

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
            label={`${t("sim.input.ville")}`}
            value={ville}
            onChange={(v) => {
              setVille(v);
              setSubmitted(false);
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

            <Disclaimer />

            <ResultGroup
              statut="convocable"
              items={results.convocable}
              titleKey="group.convocable"
              descKey="group.convocable.desc"
            />
            <ResultGroup
              statut="limite"
              items={results.limite}
              titleKey="group.limite"
              descKey="group.limite.desc"
            />

            {/* Reserved ad between result groups (non-intrusive) */}
            <AdSlot slot="sim-between-groups" />

            <ResultGroup
              statut="accesOuvert"
              items={results.accesOuvert}
              titleKey="group.accesOuvert"
              descKey="group.accesOuvert.desc"
            />
            <ResultGroup
              statut="seuilInconnu"
              items={results.seuilInconnu}
              titleKey="group.seuilInconnu"
              descKey="group.seuilInconnu.desc"
            />
            <ResultGroup
              statut="enDessous"
              items={results.enDessous}
              titleKey="group.enDessous"
              descKey="group.enDessous.desc"
              collapsible
            />
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
