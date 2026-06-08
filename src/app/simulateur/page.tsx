import type { Metadata } from "next";
import { SimulateurView } from "@/components/views/SimulateurView";

export const metadata: Metadata = {
  title: "Simulateur d'admission — Où puis-je être admis ?",
  description:
    "Entre ta moyenne de présélection et ta filière du Bac pour voir instantanément les écoles, facultés et grandes écoles où tu peux être convoqué au Maroc.",
  alternates: { canonical: "/simulateur" },
};

export default function Page() {
  return <SimulateurView />;
}
