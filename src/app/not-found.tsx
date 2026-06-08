import Link from "next/link";

// Minimal, framework-default-free 404. Kept as a server component (no i18n
// hook) so it renders cleanly for the static export fallback.
export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-extrabold text-brand-600 dark:text-brand-400">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
        Page introuvable
      </h1>
      <p className="mt-2 max-w-sm text-slate-500 dark:text-slate-400">
        La page que tu cherches n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
