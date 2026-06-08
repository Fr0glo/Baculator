import etablissements from "@/data/etablissements.json";
import type { Etablissement } from "./types";

const DATA = etablissements as unknown as Etablissement[];

/** Accent-stripped, kebab-cased slug fragment (e.g. "ENCG Settat" → "encg-settat"). */
export function kebab(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Build deterministic, unique slugs once at module load. Base is the sigle
// (which already includes the city for most schools, e.g. "ENSA Agadir");
// falls back to the name, then to the id. Collisions get a numeric suffix.
const bySlug = new Map<string, Etablissement>();
const idToSlug = new Map<number, string>();

for (const e of DATA) {
  const base = kebab(e.sigle || e.nom) || `ecole-${e.id}`;
  let slug = base;
  let n = 2;
  while (bySlug.has(slug)) slug = `${base}-${n++}`;
  bySlug.set(slug, e);
  idToSlug.set(e.id, slug);
}

/** Slug for a given establishment (stable across the app). */
export function slugForEtab(e: Etablissement): string {
  return idToSlug.get(e.id) ?? (kebab(e.sigle || e.nom) || `ecole-${e.id}`);
}

/** Look up an establishment by its slug (or undefined). */
export function etabForSlug(slug: string): Etablissement | undefined {
  return bySlug.get(slug);
}

/** All (slug, etablissement) pairs — for generateStaticParams / sitemap. */
export function allEtablissementsWithSlug(): { slug: string; etab: Etablissement }[] {
  return DATA.map((etab) => ({ slug: idToSlug.get(etab.id)!, etab }));
}
