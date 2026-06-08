"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { ConsentManager } from "@/components/ConsentManager";
import { InfoIcon } from "@/components/icons";

type Row = {
  name: string;
  purpose: { fr: string; ar: string };
  type: { fr: string; ar: string };
};

const ROWS: Row[] = [
  {
    name: "bac-consent",
    purpose: { fr: "Mémorise ton choix de cookies (accepté / refusé).", ar: "يحفظ اختيارك بشأن ملفات تعريف الارتباط (قبول / رفض)." },
    type: { fr: "Nécessaire (local)", ar: "ضروري (محلي)" },
  },
  {
    name: "bac-lang / bac-theme",
    purpose: { fr: "Mémorise la langue et le thème (clair/sombre).", ar: "يحفظ اللغة والمظهر (فاتح/داكن)." },
    type: { fr: "Nécessaire (local)", ar: "ضروري (محلي)" },
  },
  {
    name: "Vercel Web Analytics",
    purpose: { fr: "Mesure d'audience agrégée et anonyme. Chargé après consentement.", ar: "قياس إجمالي ومجهول للزيارات. يُحمَّل بعد الموافقة." },
    type: { fr: "Mesure d'audience", ar: "قياس الزيارات" },
  },
  {
    name: "Google AdSense",
    purpose: { fr: "Diffusion d'annonces (parfois personnalisées). Chargé après consentement, si activé.", ar: "عرض الإعلانات (أحيانًا مخصّصة). يُحمَّل بعد الموافقة، إن فُعِّل." },
    type: { fr: "Publicité (tiers)", ar: "إعلانات (طرف ثالث)" },
  },
];

export function CookiesView() {
  const { t, lang } = useLang();

  return (
    <div className="container-page py-8 sm:py-12">
      <PageHeader title={t("cookies.title")} subtitle={t("cookies.subtitle")} icon={<InfoIcon className="h-6 w-6" />} />

      <div className="mx-auto max-w-3xl">
        <div className="card overflow-hidden">
          <table className="w-full text-start text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 text-start font-semibold">{t("cookies.table.name")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("cookies.table.purpose")}</th>
                <th className="px-4 py-3 text-start font-semibold">{t("cookies.table.type")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {ROWS.map((r) => (
                <tr key={r.name} className="align-top">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{r.name}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{r.purpose[lang]}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{r.type[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <ConsentManager />
        </div>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/confidentialite" className="font-semibold text-brand-600 hover:underline dark:text-brand-400">
            {t("privacy.title")}
          </Link>
        </p>
      </div>
    </div>
  );
}
