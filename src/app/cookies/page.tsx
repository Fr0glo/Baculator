import type { Metadata } from "next";
import { CookiesView } from "@/components/views/CookiesView";

export const metadata: Metadata = {
  title: "Politique relative aux cookies",
  description:
    "Liste des cookies utilisés sur Bacullator (préférences, mesure d'audience, Google AdSense) et comment gérer ton consentement.",
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return <CookiesView />;
}
