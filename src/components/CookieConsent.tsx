"use client";

import Link from "next/link";
import { useConsent } from "./ConsentProvider";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * Non-intrusive bottom cookie-consent banner, shown only on the first visit
 * (i.e. while no choice is stored). Until the user accepts, analytics and ads
 * stay off (see AnalyticsGate / AdsenseLoader / AdSlot).
 */
export function CookieConsent() {
  const { consent, mounted, setConsent } = useConsent();
  const { t } = useLang();

  // Render nothing on the server / before mount, and once a choice exists.
  if (!mounted || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("consent.title")}
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="container-page">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-card-lg backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 dark:border-slate-700 dark:bg-slate-900/95">
          <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {t("consent.text")}{" "}
            <Link
              href="/confidentialite"
              className="font-semibold text-brand-600 underline-offset-2 hover:underline dark:text-brand-400"
            >
              {t("consent.learnMore")}
            </Link>
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setConsent("refused")}
              className="btn-ghost flex-1 sm:flex-none"
            >
              {t("consent.refuse")}
            </button>
            <button
              type="button"
              onClick={() => setConsent("accepted")}
              className="btn-primary flex-1 sm:flex-none"
            >
              {t("consent.accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
