import type { Metadata } from "next";
import { PrivacyView } from "@/components/views/PrivacyView";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Bacullator : données collectées, cookies, Google AdSense, mesure d'audience, et tes droits (loi 09-08 / CNDP).",
  alternates: { canonical: "/confidentialite" },
};

export default function Page() {
  return <PrivacyView />;
}
