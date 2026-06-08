// Central site configuration used for SEO, footer and sharing.

export const SITE = {
  name: "Bacullator",
  // Change this to your real domain after deploying (used for OG/canonical).
  url: "https://bacullator.vercel.app",
  // Shown in the footer as "Données mises à jour : <date>".
  dataUpdated: "2025-07-15",
  officialPortal: "https://cursussup.gov.ma",
  contactEmail: "bacullator@gmail.com",
} as const;

/** Format an ISO date (YYYY-MM-DD) for display in the chosen language. */
export function formatDate(iso: string, lang: "fr" | "ar"): string {
  const d = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-MA" : "fr-MA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
