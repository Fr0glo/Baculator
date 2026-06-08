import { useLang } from "@/i18n/LanguageProvider";

/** Compact brand mark: a graduation-cap glyph in a brand gradient tile. */
export function Logo({ withName = true }: { withName?: boolean }) {
  const { t } = useLang();
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-card">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 10 12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
        </svg>
      </span>
      {withName && (
        <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t("app.name")}
        </span>
      )}
    </span>
  );
}
