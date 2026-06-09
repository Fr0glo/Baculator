import type { Metadata } from "next";
import { TermsView } from "@/components/views/TermsView";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description:
    "Conditions d'utilisation de Bacullator : nature informative du site, seuils indicatifs, responsabilité et contact.",
  alternates: { canonical: "/conditions" },
};

export default function Page() {
  return <TermsView />;
}
