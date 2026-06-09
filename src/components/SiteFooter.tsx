"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { Logo } from "./Logo";
import { AdSlot } from "./AdSlot";
import { ExternalIcon } from "./icons";
import { SITE, formatDate } from "@/lib/site";
import type { DictKey } from "@/i18n/dictionary";

const NAV: { href: string; key: DictKey }[] = [
  { href: "/calculateur", key: "nav.calculateur" },
  { href: "/simulateur", key: "nav.simulateur" },
  { href: "/explorer", key: "nav.explorer" },
  { href: "/guides", key: "nav.guides" },
  { href: "/apropos", key: "nav.apropos" },
];

const LEGAL: { href: string; key: DictKey }[] = [
  { href: "/confidentialite", key: "nav.confidentialite" },
  { href: "/cookies", key: "nav.cookies" },
  { href: "/conditions", key: "nav.conditions" },
];

export function SiteFooter() {
  const { t, lang } = useLang();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-page py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-slate-500 dark:text-slate-400">
              {t("app.tagline")}
            </p>
            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
              {t("footer.madeFor")}
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {t("footer.legal")}
            </p>
            {LEGAL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="text-sm">
            <a
              href={SITE.officialPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400"
            >
              {t("footer.official")} <ExternalIcon className="h-3.5 w-3.5" />
            </a>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              {t("footer.updated")} :{" "}
              <time dateTime={SITE.dataUpdated} className="font-medium text-slate-700 dark:text-slate-200">
                {formatDate(SITE.dataUpdated, lang)}
              </time>
            </p>
          </div>
        </div>

        {/* Footer ad slot — invisible until AdSense is configured + consented */}
        <AdSlot slot="footer" className="!my-8" />

        <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800/60">
          <p className="text-xs leading-relaxed text-slate-400 dark:text-slate-500">
            {t("disclaimer")}
          </p>
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} {SITE.name}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
