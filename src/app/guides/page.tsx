import type { Metadata } from "next";
import { GuidesView } from "@/components/views/GuidesView";

export const metadata: Metadata = {
  title: "Guides du bachelier — présélection, seuils & orientation",
  description:
    "Guides clairs pour les bacheliers marocains : comprendre la présélection, la différence avec la moyenne du Bac, les seuils, et comment bien choisir où postuler.",
  alternates: { canonical: "/guides" },
};

export default function Page() {
  return <GuidesView />;
}
