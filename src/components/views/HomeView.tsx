"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { AdSlot } from "@/components/AdSlot";
import { Disclaimer } from "@/components/Disclaimer";
import {
  ArrowRightIcon,
  CalculatorIcon,
  TargetIcon,
  SparkIcon,
  CheckIcon,
} from "@/components/icons";
import type { DictKey } from "@/i18n/dictionary";

const STEPS: { titleKey: DictKey; descKey: DictKey; n: number }[] = [
  { n: 1, titleKey: "home.step1.title", descKey: "home.step1.desc" },
  { n: 2, titleKey: "home.step2.title", descKey: "home.step2.desc" },
  { n: 3, titleKey: "home.step3.title", descKey: "home.step3.desc" },
];

const FEATURES: { icon: JSX.Element; titleKey: DictKey; descKey: DictKey }[] = [
  { icon: <CalculatorIcon className="h-6 w-6" />, titleKey: "home.feature1.title", descKey: "home.feature1.desc" },
  { icon: <TargetIcon className="h-6 w-6" />, titleKey: "home.feature2.title", descKey: "home.feature2.desc" },
  { icon: <SparkIcon className="h-6 w-6" />, titleKey: "home.feature3.title", descKey: "home.feature3.desc" },
];

export function HomeView() {
  const { t } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="hero-glow">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge mb-5 animate-fade-up bg-brand-100 px-3 py-1 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
              <CheckIcon className="h-3.5 w-3.5" />
              {t("home.hero.free")}
            </span>
            <h1 className="animate-fade-up text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              {t("home.hero.title")}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-lg text-slate-600 dark:text-slate-300">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/simulateur" className="btn-primary w-full px-7 py-3.5 text-base sm:w-auto">
                {t("home.hero.cta")}
                <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
              </Link>
              <Link href="/calculateur" className="btn-outline w-full px-7 py-3.5 text-base sm:w-auto">
                <CalculatorIcon className="h-5 w-5" />
                {t("home.hero.cta2")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page">
        {/* How it works */}
        <section className="py-12 sm:py-16">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {t("home.steps.title")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="card p-6 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-lg font-extrabold text-white shadow-card">
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  {t(s.titleKey)}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t(s.descKey)}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="home-mid" />

        {/* Features */}
        <section className="py-12 sm:py-16">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {t("home.features.title")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.titleKey} className="card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  {t(f.titleKey)}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="py-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-10 text-center shadow-card-lg sm:px-12 sm:py-14">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {t("home.hero.title")}
            </h2>
            <Link
              href="/simulateur"
              className="btn mt-6 bg-white px-7 py-3.5 text-base text-brand-700 shadow-card hover:bg-brand-50"
            >
              {t("home.hero.cta")}
              <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" />
            </Link>
          </div>
        </section>

        <section className="pb-12">
          <Disclaimer />
        </section>
      </div>
    </>
  );
}
