import type { Metadata } from "next";
import { ExplorerView } from "@/components/views/ExplorerView";

export const metadata: Metadata = {
  title: "Explorer les écoles et facultés du Maroc",
  description:
    "Cherche et filtre tous les établissements : médecine, ENSA, ENCG, ENSAM, facultés à accès ouvert et universités privées. Seuils 2023–2025, places et filières acceptées.",
  alternates: { canonical: "/explorer" },
};

export default function Page() {
  return <ExplorerView />;
}
