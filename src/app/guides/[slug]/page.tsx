import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideView } from "@/components/views/GuideView";
import { GUIDES, guideForSlug } from "@/content/guides";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const guide = guideForSlug(params.slug);
  if (!guide) return { title: "Guide introuvable" };
  return {
    title: guide.title.fr,
    description: guide.description.fr,
    alternates: { canonical: `/guides/${params.slug}` },
    openGraph: { title: `${guide.title.fr} · Bacullator`, description: guide.description.fr },
  };
}

export default function Page({ params }: { params: Params }) {
  const guide = guideForSlug(params.slug);
  if (!guide) notFound();
  return <GuideView guide={guide} />;
}
