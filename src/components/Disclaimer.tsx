"use client";

import { useLang } from "@/i18n/LanguageProvider";
import { InfoIcon } from "./icons";

/** Persistent honesty note shown near every result surface. */
export function Disclaimer({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <div
      role="note"
      className="flex items-start gap-2.5 rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-900 dark:border-accent-500/30 dark:bg-accent-500/10 dark:text-accent-200"
    >
      <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="leading-relaxed">{t(compact ? "disclaimer.short" : "disclaimer")}</p>
    </div>
  );
}
