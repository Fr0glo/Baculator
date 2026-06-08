import type { Metadata } from "next";
import { CalculateurView } from "@/components/views/CalculateurView";

export const metadata: Metadata = {
  title: "Calculateur de moyenne (présélection & Bac)",
  description:
    "Calcule ta moyenne de présélection (75% National + 25% Régional) et ta moyenne du Bac. Comprends quelle moyenne les seuils utilisent, et calcule à l'envers la note National qu'il te faut.",
  alternates: { canonical: "/calculateur" },
};

export default function Page() {
  return <CalculateurView />;
}
