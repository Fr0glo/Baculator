"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { NoteField, parseNote } from "@/components/NoteField";
import { Disclaimer } from "@/components/Disclaimer";
import { AdSlot } from "@/components/AdSlot";
import { CalculatorIcon, ArrowRightIcon, InfoIcon, TargetIcon } from "@/components/icons";
import {
  moyennePreselection,
  moyenneBac,
  nationalRequisPourReussirBac,
  formatNote,
  round2,
} from "@/lib/calcul";

type Mode = "A" | "B";

const STORAGE_KEY = "bac-calc-inputs";

export function CalculateurView() {
  const { t, lang } = useLang();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("A");

  // Mode A (présélection)
  const [national, setNational] = useState("");
  const [regional, setRegional] = useState("");
  // Mode B (diplôme)
  const [bacRegional, setBacRegional] = useState("");
  const [controle, setControle] = useState("");
  const [bacNational, setBacNational] = useState("");
  // Reverse — note National minimale pour réussir le Bac (moyenne ≥ 10)
  const [revRegional, setRevRegional] = useState("");
  const [revControle, setRevControle] = useState("");

  // Restore last inputs (allowed for convenience; not core logic).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s.mode === "A" || s.mode === "B") setMode(s.mode);
      setNational(s.national ?? "");
      setRegional(s.regional ?? "");
      setBacRegional(s.bacRegional ?? "");
      setControle(s.controle ?? "");
      setBacNational(s.bacNational ?? "");
    } catch {
      /* ignore */
    }
  }, []);

  // Persist on change.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ mode, national, regional, bacRegional, controle, bacNational })
      );
    } catch {
      /* ignore */
    }
  }, [mode, national, regional, bacRegional, controle, bacNational]);

  // Mode A result
  const preselection = useMemo(() => {
    const n = parseNote(national);
    const r = parseNote(regional);
    if (n === null || r === null) return null;
    return moyennePreselection(n, r);
  }, [national, regional]);

  // Mode B result
  const bac = useMemo(() => {
    const r = parseNote(bacRegional);
    const c = parseNote(controle);
    const n = parseNote(bacNational);
    if (r === null || c === null || n === null) return null;
    return moyenneBac(r, c, n);
  }, [bacRegional, controle, bacNational]);

  // Reverse result: National score required to reach a Bac average of 10.
  const reverse = useMemo(() => {
    const r = parseNote(revRegional);
    const cc = parseNote(revControle);
    if (r === null || cc === null) return null;
    const required = nationalRequisPourReussirBac(r, cc, 10);
    return { required, r, cc };
  }, [revRegional, revControle]);

  function sendToSimulator(value: number) {
    router.push(`/simulateur?moyenne=${round2(value)}`);
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <PageHeader
        title={t("calc.title")}
        subtitle={t("calc.subtitle")}
        icon={<CalculatorIcon className="h-6 w-6" />}
      />

      {/* Mode toggle */}
      <div
        role="tablist"
        aria-label={t("calc.title")}
        className="mb-6 grid grid-cols-2 gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800/70"
      >
        <ModeTab active={mode === "A"} onClick={() => setMode("A")} label={t("calc.modeA")} sub={t("calc.modeA.short")} />
        <ModeTab active={mode === "B"} onClick={() => setMode("B")} label={t("calc.modeB")} sub={t("calc.modeB.short")} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Inputs */}
        <div className="card p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
            <span className="font-mono text-xs">{mode === "A" ? t("calc.modeA.formula") : t("calc.modeB.formula")}</span>
          </div>

          {mode === "A" ? (
            <div className="space-y-4">
              <NoteField label={t("calc.input.national")} help={t("calc.input.help")} value={national} onChange={setNational} placeholder={t("calc.input.placeholder")} autoFocus />
              <NoteField label={t("calc.input.regional")} help={t("calc.input.help")} value={regional} onChange={setRegional} placeholder={t("calc.input.placeholder")} />
            </div>
          ) : (
            <div className="space-y-4">
              <NoteField label={t("calc.input.regional")} help={t("calc.input.help")} value={bacRegional} onChange={setBacRegional} placeholder={t("calc.input.placeholder")} autoFocus />
              <NoteField label={t("calc.input.controle")} help={t("calc.input.help")} value={controle} onChange={setControle} placeholder={t("calc.input.placeholder")} />
              <NoteField label={t("calc.input.national")} help={t("calc.input.help")} value={bacNational} onChange={setBacNational} placeholder={t("calc.input.placeholder")} />
            </div>
          )}
        </div>

        {/* Result */}
        <div className="flex flex-col gap-4">
          <ResultCard
            label={mode === "A" ? t("calc.result.preselection") : t("calc.result.bac")}
            value={mode === "A" ? preselection : bac}
            lang={lang}
            empty={t("calc.result.empty")}
            accent={mode === "A"}
          />

          {((mode === "A" && preselection !== null) ||
            (mode === "B" && bac !== null)) && (
            <button
              onClick={() => sendToSimulator((mode === "A" ? preselection : bac) as number)}
              className="btn-primary w-full py-3.5 text-base"
            >
              {t("calc.useInSim")}
              <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
            </button>
          )}

          {/* Seuil note — the crucial explanation */}
          <div className="flex items-start gap-2.5 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-900 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200">
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="leading-relaxed">{t("calc.note.seuils")}</p>
          </div>
        </div>
      </div>

      {/* Reverse — National score needed to pass the Bac (always visible) */}
      <div className="card mt-6 overflow-hidden border-accent-200 dark:border-accent-500/30">
        <div className="flex items-center gap-2.5 bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-4 font-bold text-white">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/20">
            <TargetIcon className="h-5 w-5" />
          </span>
          <span className="text-sm sm:text-base">{t("calc.reverse.toggle")}</span>
        </div>

        <div className="p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("calc.reverse.title")}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("calc.reverse.desc")}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <NoteField label={t("calc.input.regional")} help={t("calc.input.help")} value={revRegional} onChange={setRevRegional} placeholder={t("calc.input.placeholder")} />
            <NoteField label={t("calc.input.controle")} help={t("calc.input.help")} value={revControle} onChange={setRevControle} placeholder={t("calc.input.placeholder")} />
          </div>

          {reverse ? (
            <div className="mt-5 animate-fade-in">
              {reverse.required > 20 ? (
                <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                  {t("calc.reverse.impossible")}
                </p>
              ) : reverse.required <= 0 ? (
                <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                  {t("calc.reverse.already")}
                </p>
              ) : (
                <div className="flex items-center justify-between gap-3 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 px-5 py-4 text-white">
                  <span className="text-sm font-medium">{t("calc.reverse.result")}</span>
                  <span className="text-3xl font-extrabold tabular-nums">
                    {formatNote(reverse.required, lang)}
                    <span className="text-base font-medium opacity-80">/20</span>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
              {t("calc.reverse.example")}
            </p>
          )}
        </div>
      </div>

      <AdSlot slot="calc-bottom" />
      <Disclaimer />
    </div>
  );
}

function ModeTab({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-xl px-3 py-2.5 text-center transition ${
        active
          ? "bg-white text-slate-900 shadow-card dark:bg-slate-900 dark:text-white"
          : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      }`}
    >
      <span className="block text-sm font-bold">{label}</span>
      <span className="mt-0.5 block text-xs opacity-70">{sub}</span>
    </button>
  );
}

function ResultCard({
  label,
  value,
  lang,
  empty,
  accent,
}: {
  label: string;
  value: number | null;
  lang: "fr" | "ar";
  empty: string;
  accent: boolean;
}) {
  return (
    <div
      className={`card flex flex-col items-center justify-center p-8 text-center transition ${
        value !== null && accent
          ? "border-brand-200 bg-gradient-to-br from-brand-50 to-white dark:border-brand-500/30 dark:from-brand-500/10 dark:to-slate-900"
          : ""
      }`}
    >
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      {value !== null ? (
        <p className="mt-2 animate-scale-in text-5xl font-extrabold tabular-nums text-slate-900 dark:text-white">
          {formatNote(value, lang)}
          <span className="text-2xl font-semibold text-slate-400">/20</span>
        </p>
      ) : (
        <p className="mt-3 text-sm text-slate-400 dark:text-slate-500">{empty}</p>
      )}
    </div>
  );
}
