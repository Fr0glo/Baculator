"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { SelectField, type Option } from "@/components/SelectField";
import { EtablissementCard } from "@/components/EtablissementCard";
import { Disclaimer } from "@/components/Disclaimer";
import { AdSlot } from "@/components/AdSlot";
import { SearchIcon } from "@/components/icons";
import etablissements from "@/data/etablissements.json";
import type { Etablissement } from "@/lib/types";

const DATA = etablissements as unknown as Etablissement[];

const uniq = (arr: string[]) => Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b, "fr"));
const DOMAINES = uniq(DATA.map((e) => e.domaine));
const VILLES = uniq(DATA.map((e) => e.ville));
const ACCES = uniq(DATA.map((e) => e.typeAcces).filter(Boolean));

export function ExplorerView() {
  const { t } = useLang();

  const [search, setSearch] = useState("");
  const [domaine, setDomaine] = useState("");
  const [ville, setVille] = useState("");
  const [secteur, setSecteur] = useState("");
  const [acces, setAcces] = useState("");

  const opt = (vals: string[]): Option[] => vals.map((v) => ({ value: v, label: v }));

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return DATA.filter((e) => {
      if (domaine && e.domaine !== domaine) return false;
      if (ville && e.ville !== ville) return false;
      if (secteur && e.secteur !== secteur) return false;
      if (acces && e.typeAcces !== acces) return false;
      if (q) {
        const hay = `${e.nom} ${e.sigle} ${e.ville} ${e.universite} ${e.domaine}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, domaine, ville, secteur, acces]);

  const hasFilters = search || domaine || ville || secteur || acces;
  function reset() {
    setSearch("");
    setDomaine("");
    setVille("");
    setSecteur("");
    setAcces("");
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <PageHeader
        title={t("explore.title")}
        subtitle={t("explore.subtitle")}
        icon={<SearchIcon className="h-6 w-6" />}
      />

      {/* Filters */}
      <div className="card sticky top-16 z-20 p-4 sm:p-5">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("explore.search")}
            className="input-field ps-10"
            aria-label={t("explore.search")}
          />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SelectField label={t("explore.filter.domaine")} value={domaine} onChange={setDomaine} options={opt(DOMAINES)} placeholder={t("explore.filter.all")} />
          <SelectField label={t("explore.filter.ville")} value={ville} onChange={setVille} options={opt(VILLES)} placeholder={t("explore.filter.all")} />
          <SelectField
            label={t("explore.filter.secteur")}
            value={secteur}
            onChange={setSecteur}
            options={[
              { value: "Public", label: t("explore.secteur.public") },
              { value: "Prive", label: t("explore.secteur.prive") },
            ]}
            placeholder={t("explore.filter.all")}
          />
          <SelectField label={t("explore.filter.acces")} value={acces} onChange={setAcces} options={opt(ACCES)} placeholder={t("explore.filter.all")} />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {t("explore.results", { n: filtered.length })}
          </p>
          {hasFilters && (
            <button onClick={reset} className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">
              {t("explore.reset")}
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="card mt-6 flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
            <SearchIcon className="h-7 w-7" />
          </div>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{t("explore.empty")}</p>
          {hasFilters && (
            <button onClick={reset} className="btn-ghost mt-4">
              {t("explore.reset")}
            </button>
          )}
        </div>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <EtablissementCard key={e.id} etab={e} />
          ))}
        </div>
      )}

      <AdSlot slot="explore-bottom" />
      <Disclaimer />
    </div>
  );
}
