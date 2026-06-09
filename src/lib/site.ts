// Central site configuration used for SEO, footer and sharing.

export const SITE = {
  name: "Bacullator",
  siteAuthor: "Bacullator",
  // Real domain (used for OG/canonical/sitemap). The site serves on this host;
  // visitors never see the underlying *.vercel.app address.
  url: "https://www.bacullator.com",
  // ⚠️ UPDATE THIS BY HAND each time you refresh the seuils data (ISO date,
  // YYYY-MM-DD). Shown in the footer as "Données mises à jour : <date>".
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
