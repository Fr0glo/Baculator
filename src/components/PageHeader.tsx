import type { ReactNode } from "react";

/** Consistent page title + subtitle block. */
export function PageHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-8 animate-fade-up">
      {icon && (
        <div className="mb-3 inline-grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300">
          {icon}
        </div>
      )}
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-base text-slate-500 dark:text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}
