"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRightIcon, SparkIcon } from "@/components/icons";
import { GUIDES } from "@/content/guides";

export function GuidesView() {
  const { t, lang } = useLang();

  return (
    <div className="container-page py-8 sm:py-12">
      <PageHeader title={t("guides.title")} subtitle={t("guides.subtitle")} icon={<SparkIcon className="h-6 w-6" />} />

      <div className="grid gap-4 sm:grid-cols-2">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="card group flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-card-lg sm:p-6"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
              {g.readingMinutes} {t("guides.minRead")}
            </span>
            <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900 dark:text-white">
              {g.title[lang]}
            </h2>
            <p className="mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400">{g.description[lang]}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-400">
              {t("guides.readMore")}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
