"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { Disclaimer } from "@/components/Disclaimer";
import { AdSlot } from "@/components/AdSlot";
import { ShareButton } from "@/components/ShareButton";
import { ArrowRightIcon } from "@/components/icons";
import type { Guide } from "@/content/guides";

export function GuideView({ guide }: { guide: Guide }) {
  const { t, lang } = useLang();

  return (
    <div className="container-page py-8 sm:py-12">
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
      >
        <ArrowRightIcon className="h-4 w-4 rotate-180 rtl:rotate-0" />
        {t("guides.back")}
      </Link>

      <article className="mx-auto mt-4 max-w-3xl">
        <header className="animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
            {guide.readingMinutes} {t("guides.minRead")}
          </span>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {guide.title[lang]}
          </h1>
          <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">{guide.description[lang]}</p>
          <div className="mt-4">
            <ShareButton />
          </div>
        </header>

        <div className="mt-8 space-y-8">
          {guide.sections.map((s) => (
            <section key={s.h.fr}>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{s.h[lang]}</h2>
              <div className="mt-2 space-y-3 leading-relaxed text-slate-600 dark:text-slate-300">
                {s.p.map((para, i) => (
                  <p key={i}>{para[lang]}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <AdSlot slot="guide-mid" />

        {/* CTA into the tools */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-center text-white sm:p-8">
          <h2 className="text-xl font-extrabold">{t("guides.ctaTitle")}</h2>
          <p className="mt-1 text-sm text-brand-50/90">{t("guides.ctaText")}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/calculateur" className="btn bg-white px-5 py-3 text-sm text-brand-700 hover:bg-brand-50">
              {t("home.hero.cta2")}
            </Link>
            <Link href="/simulateur" className="btn bg-accent-500 px-5 py-3 text-sm text-white hover:bg-accent-600">
              {t("home.hero.cta")}
              <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Disclaimer />
        </div>
      </article>
    </div>
  );
}
