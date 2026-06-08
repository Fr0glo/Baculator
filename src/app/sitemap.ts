import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { allEtablissementsWithSlug } from "@/lib/slug";

// Generates a static sitemap.xml at build time (output: export friendly).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/simulateur", priority: 0.9, freq: "monthly" },
    { path: "/calculateur", priority: 0.8, freq: "monthly" },
    { path: "/explorer", priority: 0.8, freq: "monthly" },
    { path: "/apropos", priority: 0.5, freq: "monthly" },
    { path: "/confidentialite", priority: 0.3, freq: "monthly" },
    { path: "/cookies", priority: 0.3, freq: "monthly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  // One entry per establishment detail page (long-tail SEO).
  const ecoleEntries: MetadataRoute.Sitemap = allEtablissementsWithSlug().map(({ slug }) => ({
    url: `${SITE.url}/ecole/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...ecoleEntries];
}
