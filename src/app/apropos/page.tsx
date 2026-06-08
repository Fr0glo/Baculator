import type { Metadata } from "next";
import { AProposView } from "@/components/views/AProposView";

export const metadata: Metadata = {
  title: "À propos & FAQ — Seuils, présélection et données",
  description:
    "Comprends ce qu'est un seuil de présélection, la différence avec la moyenne du Bac, et comment ces données sont mises à jour. Vérifie toujours sur cursussup.gov.ma.",
  alternates: { canonical: "/apropos" },
};

export default function Page() {
  return <AProposView />;
}
