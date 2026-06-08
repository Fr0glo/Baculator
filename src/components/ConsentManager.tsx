"use client";

import { useConsent } from "./ConsentProvider";
import { useLang } from "@/i18n/LanguageProvider";
import type { DictKey } from "@/i18n/dictionary";

/**
 * Shows the visitor's current cookie choice and lets them change it.
 * Used on the privacy page so consent can be withdrawn at any time.
 */
export function ConsentManager() {
  const { consent, mounted, setConsent, reset } = useConsent();
  const { t } = useLang();

  const stateKey: DictKey =
    consent === "accepted"
      ? "consent.current.accepted"
      : consent === "refused"
        ? "consent.current.refused"
        : "consent.current.none";

  return (
    <div className="card p-5">
      <h2 className="text-base font-bold text-slate-900 dark:text-white">{t("consent.manage")}</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {mounted ? t(stateKey) : t("consent.current.none")}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setConsent("accepted")} className="btn-primary">
          {t("consent.accept")}
        </button>
        <button type="button" onClick={() => setConsent("refused")} className="btn-ghost">
          {t("consent.refuse")}
        </button>
        <button type="button" onClick={reset} className="btn-outline">
          {t("consent.reset")}
        </button>
      </div>
    </div>
  );
}
