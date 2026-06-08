import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EcoleView } from "@/components/views/EcoleView";
import { allEtablissementsWithSlug, etabForSlug } from "@/lib/slug";
import { dict } from "@/i18n/dictionary";

type Params = { slug: string };

// One static page per establishment — required & supported under output: export.
export function generateStaticParams(): Params[] {
  return allEtablissementsWithSlug().map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const etab = etabForSlug(params.slug);
  if (!etab) return { title: "École introuvable" };

  const seuil =
    etab.seuil2025 !== null
      ? `${etab.seuil2025}/20`
      : etab.accesOuvert
        ? "accès ouvert"
        : "à confirmer";

  const title = `${etab.nom} (${etab.sigle}) — Seuil 2025`;
  const description = dict["ecole.metaDesc"].fr
    .replace("{sigle}", etab.sigle || etab.nom)
    .replace("{ville}", etab.ville)
    .concat(` Seuil de présélection : ${seuil}.`);

  return {
    title,
    description,
    alternates: { canonical: `/ecole/${params.slug}` },
    openGraph: { title: `${title} · Bacullator`, description },
  };
}

export default function Page({ params }: { params: Params }) {
  const etab = etabForSlug(params.slug);
  if (!etab) notFound();
  return <EcoleView etab={etab} />;
}
