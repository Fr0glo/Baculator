"use client";

import { useLang } from "@/i18n/LanguageProvider";

/** Small "estimé" badge with an accessible tooltip for estimated seuils. */
export function EstimeBadge() {
  const { t } = useLang();
  return (
    <span
      className="badge group relative cursor-help bg-accent-100 text-accent-800 dark:bg-accent-500/15 dark:text-accent-200"
      tabIndex={0}
      role="note"
      aria-label={t("card.estime.tooltip")}
    >
      ≈ {t("card.seuilEstime")}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full start-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-center text-xs font-normal text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus:opacity-100 rtl:translate-x-1/2 dark:bg-slate-700"
      >
        {t("card.estime.tooltip")}
      </span>
    </span>
  );
}
