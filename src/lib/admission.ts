import type {
  Etablissement,
  EligibiliteStatut,
  ResultatMatch,
} from "./types";

/** Margin band below the seuil that still counts as "Limite / tente quand même". */
export const LIMITE_MARGE = 0.5;

/**
 * Decide whether an establishment accepts a given Bac track.
 * "ALL" (Toutes filières / Variable) matches every track.
 */
export function matchFiliere(etab: Etablissement, filiere: string): boolean {
  return etab.filieres.includes("ALL") || etab.filieres.includes(filiere as never);
}

/**
 * Compute the eligibility verdict for one establishment.
 * Returns null when the track does not match (school is excluded entirely).
 */
export function evaluer(
  etab: Etablissement,
  moyenne: number,
  filiere: string
): ResultatMatch | null {
  if (!matchFiliere(etab, filiere)) return null;

  // Open access: eligible by track alone, no seuil needed.
  if (etab.accesOuvert) {
    return { etablissement: etab, statut: "accesOuvert", marge: null, estime: false };
  }

  // Unknown seuil: we cannot claim eligibility.
  if (etab.seuilInconnu || etab.seuil2025 === null) {
    return { etablissement: etab, statut: "seuilInconnu", marge: null, estime: etab.seuilEstime };
  }

  const seuil = etab.seuil2025;
  const marge = moyenne - seuil;
  let statut: EligibiliteStatut;
  if (marge >= 0) statut = "convocable";
  else if (marge >= -LIMITE_MARGE) statut = "limite";
  else statut = "enDessous";

  return { etablissement: etab, statut, marge, estime: etab.seuilEstime };
}

/** Grouped simulator output, in display order. */
export type ResultatsGroupes = {
  convocable: ResultatMatch[];
  limite: ResultatMatch[];
  accesOuvert: ResultatMatch[];
  seuilInconnu: ResultatMatch[];
  enDessous: ResultatMatch[];
  /** Count of schools whose track matched (= everything except track-excluded). */
  totalMatchFiliere: number;
};

/**
 * Run the simulator across all establishments.
 * Sorting:
 *  - convocable: by margin desc (most comfortable first)
 *  - limite: by margin desc (closest to clearing first)
 *  - enDessous: by margin desc (nearest below first)
 *  - others: by seuil desc then name
 * A preferred city, when given, boosts matching schools to the top of their group.
 */
export function simuler(
  etablissements: Etablissement[],
  moyenne: number,
  filiere: string,
  villePref?: string | null
): ResultatsGroupes {
  const groups: ResultatsGroupes = {
    convocable: [],
    limite: [],
    accesOuvert: [],
    seuilInconnu: [],
    enDessous: [],
    totalMatchFiliere: 0,
  };

  for (const etab of etablissements) {
    const res = evaluer(etab, moyenne, filiere);
    if (!res) continue;
    groups.totalMatchFiliere += 1;
    groups[res.statut].push(res);
  }

  const ville = villePref?.trim().toLowerCase() || null;
  const cityRank = (r: ResultatMatch) =>
    ville && r.etablissement.ville.toLowerCase() === ville ? 0 : 1;

  const byMargeDesc = (a: ResultatMatch, b: ResultatMatch) => {
    const c = cityRank(a) - cityRank(b);
    if (c !== 0) return c;
    return (b.marge ?? -Infinity) - (a.marge ?? -Infinity);
  };
  const bySeuilDesc = (a: ResultatMatch, b: ResultatMatch) => {
    const c = cityRank(a) - cityRank(b);
    if (c !== 0) return c;
    const sa = a.etablissement.seuil2025 ?? -Infinity;
    const sb = b.etablissement.seuil2025 ?? -Infinity;
    if (sb !== sa) return sb - sa;
    return a.etablissement.nom.localeCompare(b.etablissement.nom);
  };
  const byCityThenName = (a: ResultatMatch, b: ResultatMatch) => {
    const c = cityRank(a) - cityRank(b);
    if (c !== 0) return c;
    return a.etablissement.nom.localeCompare(b.etablissement.nom);
  };

  groups.convocable.sort(byMargeDesc);
  groups.limite.sort(byMargeDesc);
  groups.enDessous.sort(byMargeDesc);
  groups.seuilInconnu.sort(bySeuilDesc);
  groups.accesOuvert.sort(byCityThenName);

  return groups;
}
