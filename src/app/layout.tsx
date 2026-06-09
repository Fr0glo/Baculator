import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieConsent } from "@/components/CookieConsent";
import { AnalyticsGate } from "@/components/AnalyticsGate";
import { SITE } from "@/lib/site";
import { ADSENSE_PUBLISHER } from "@/lib/ads";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Bacullator — Calculateur de moyenne & simulateur d'admission",
    template: "%s · Bacullator",
  },
  description:
    "Calcule ta moyenne de présélection (75/25) et découvre les écoles et facultés où tu peux être admis avec ta note du Bac. Gratuit, en français et en arabe.",
  keywords: [
    "moyenne présélection",
    "seuil cursussup",
    "admission Maroc",
    "calculateur moyenne bac",
    "simulateur admission",
    "ENSA ENCG médecine seuil",
    "bachelier Maroc",
  ],
  authors: [{ name: "Bacullator" }],
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: SITE.url,
    siteName: SITE.name,
    title: "Découvre où tu peux être admis avec ta note du Bac",
    description:
      "Calculateur de moyenne de présélection + simulateur d'admission par filière. Seuils 2023–2025. Gratuit, FR & AR.",
    // The OG image is generated at build time by src/app/opengraph-image.tsx.
  },
  twitter: {
    card: "summary_large_image",
    title: "Bacullator",
    description:
      "Calcule ta moyenne de présélection et vois où tu peux être admis. Gratuit, FR & AR.",
    // Twitter falls back to the generated OG image.
  },
  // Favicon is served from src/app/icon.svg (file convention).
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
  // AdSense site verification — inert meta tag (no script, no cookie).
  other: { "google-adsense-account": ADSENSE_PUBLISHER },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b981" },
    { media: "(prefers-color-scheme: dark)", color: "#022c22" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Runs before paint to apply the saved theme + language and avoid any flash.
const noFlashScript = `
(function() {
  try {
    var t = localStorage.getItem('bac-theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    }
    var l = localStorage.getItem('bac-lang');
    if (l === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        {/* AdSense loader — present in <head> for site verification + Auto Ads. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
          >
            Aller au contenu
          </a>
          <SiteHeader />
          <main id="main" className="min-h-[70vh]">
            {children}
          </main>
          <SiteFooter />
          {/* Consent banner + consent-gated analytics */}
          <CookieConsent />
          <AnalyticsGate />
        </Providers>
      </body>
    </html>
  );
}
