import type {
  Etablissement,
  EligibiliteStatut,
  ResultatMatch,
} from "./types";

/** Margin band below the seuil that still counts as "Limite / tente quand même". */
export const LIMITE_MARGE = 0.5;

/** Accent-insensitive, trimmed, lowercased city key ("Fès" === "Fes"). */
export function normalizeVille(s: string | null | undefined): string {
  return (s ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * Does the school accept this Bac track?
 * When per-track seuils exist, their keys are the source of truth (a track not
 * listed is not accepted). Otherwise fall back to the `filieres` list / "ALL".
 */
export function accepteFiliere(etab: Etablissement, filiere: string): boolean {
  if (etab.seuilsParFiliere) {
    return Object.prototype.hasOwnProperty.call(etab.seuilsParFiliere, filiere);
  }
  return etab.filieres.includes("ALL") || etab.filieres.includes(filiere as never);
}

/** The effective seuil for a student: per-track value if any, else the global one. */
export function effectiveSeuil(
  etab: Etablissement,
  filiere: string
): { value: number | null; track: string | null } {
  if (etab.seuilsParFiliere && filiere in etab.seuilsParFiliere) {
    return { value: etab.seuilsParFiliere[filiere], track: filiere };
  }
  return { value: etab.seuil2025, track: null };
}

/**
 * Compute the eligibility verdict for one establishment.
 * Returns null when the track is not accepted (school excluded entirely).
 */
export function evaluer(
  etab: Etablissement,
  moyenne: number,
  filiere: string
): ResultatMatch | null {
  if (!accepteFiliere(etab, filiere)) return null;

  const base = {
    etablissement: etab,
    marge: null as number | null,
    estime: false,
    seuilApplique: null as number | null,
    trackSeuil: null as string | null,
  };

  // Post-CPGE / private: no post-Bac seuil — informational only.
  if (etab.horsPreselection) {
    return { ...base, statut: "horsPreselection" };
  }

  // Open-access faculty: eligible by track alone.
  if (etab.accesOuvert) {
    return { ...base, statut: "accesOuvert" };
  }

  const { value: seuil, track } = effectiveSeuil(etab, filiere);

  // Unknown seuil — cannot claim eligibility.
  if (seuil === null) {
    return { ...base, statut: "seuilInconnu", estime: etab.seuilEstime, trackSeuil: track };
  }

  const marge = moyenne - seuil;

  // Variable cutoff (sur dossier): its own group, with the margin for context.
  if (etab.seuilVariable) {
    return {
      ...base,
      statut: "selectionDossier",
      marge,
      estime: true,
      seuilApplique: seuil,
      trackSeuil: track,
    };
  }

  let statut: EligibiliteStatut;
  if (marge >= 0) statut = "convocable";
  else if (marge >= -LIMITE_MARGE) statut = "limite";
  else statut = "enDessous";

  return {
    ...base,
    statut,
    marge,
    estime: etab.seuilEstime,
    seuilApplique: seuil,
    trackSeuil: track,
  };
}

/** Grouped simulator output, in display order. */
export type ResultatsGroupes = {
  convocable: ResultatMatch[];
  limite: ResultatMatch[];
  accesOuvert: ResultatMatch[];
  selectionDossier: ResultatMatch[];
  seuilInconnu: ResultatMatch[];
  enDessous: ResultatMatch[];
  horsPreselection: ResultatMatch[];
  /** Count of schools whose track was accepted (everything except track-excluded). */
  totalMatchFiliere: number;
};

/**
 * Run the simulator across all establishments and group the verdicts.
 * City handling lives in the view (real filter + "voir les autres villes"),
 * so this stays city-agnostic and just sorts each group sensibly.
 */
export function simuler(
  etablissements: Etablissement[],
  moyenne: number,
  filiere: string
): ResultatsGroupes {
  const groups: ResultatsGroupes = {
    convocable: [],
    limite: [],
    accesOuvert: [],
    selectionDossier: [],
    seuilInconnu: [],
    enDessous: [],
    horsPreselection: [],
    totalMatchFiliere: 0,
  };

  for (const etab of etablissements) {
    const res = evaluer(etab, moyenne, filiere);
    if (!res) continue;
    groups.totalMatchFiliere += 1;
    groups[res.statut].push(res);
  }

  const byMargeDesc = (a: ResultatMatch, b: ResultatMatch) =>
    (b.marge ?? -Infinity) - (a.marge ?? -Infinity);
  const byName = (a: ResultatMatch, b: ResultatMatch) =>
    a.etablissement.nom.localeCompare(b.etablissement.nom);

  groups.convocable.sort(byMargeDesc);
  groups.limite.sort(byMargeDesc);
  groups.enDessous.sort(byMargeDesc);
  groups.selectionDossier.sort(byMargeDesc);
  groups.seuilInconnu.sort(byName);
  groups.accesOuvert.sort(byName);
  groups.horsPreselection.sort(byName);

  return groups;
}
