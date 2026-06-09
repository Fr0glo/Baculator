// Shared domain types for the whole app.

/** Bac track (filière) codes used across Morocco's pre-selection system. */
export type FiliereCode =
  | "SM" // Sciences Mathématiques
  | "PC" // Sciences Physiques
  | "SVT" // Sciences de la Vie et de la Terre
  | "SAgr" // Sciences Agronomiques
  | "STE" // Sciences et Technologies Électriques
  | "STM" // Sciences et Technologies Mécaniques
  | "SGC" // Sciences de Gestion Comptable
  | "SE" // Sciences Économiques
  | "LSH"; // Lettres et Sciences Humaines

/** Special marker meaning "all tracks accepted" (Toutes filières). */
export const ALL_FILIERES = "ALL" as const;

/**
 * Normalized establishment record consumed by the UI.
 * Produced by scripts/xlsx-to-json.mjs from the owner's spreadsheet.
 */
export type Etablissement = {
  id: number;
  nom: string;
  sigle: string;
  ville: string;
  universite: string;
  secteur: "Public" | "Prive";
  domaine: string;
  typeAcces: string;
  /** Normalized track codes, or ["ALL"] when every track is accepted. */
  filieres: (FiliereCode | typeof ALL_FILIERES)[];
  /** Single national/ENA seuil, the estimate for variable schools, or null. */
  seuil2025: number | null;
  /**
   * Per-track présélection seuils (ENSA/ENCG/ENSAM/Médecine), parsed from the
   * "Seuil 2025 - detail par filiere" column. Keys are canonical track codes.
   * When present, it is the source of truth for which tracks the school accepts.
   */
  seuilsParFiliere: Record<string, number> | null;
  seuil2024: number | null;
  seuil2023: number | null;
  /** True when the seuil is an estimate (≈ in the sheet, or a §3 estimate). */
  seuilEstime: boolean;
  /** True for "sur dossier — cutoff published after admission" schools (EST, FST…). */
  seuilVariable: boolean;
  /** True when access is open ("N/A" in the sheet): no seuil needed. */
  accesOuvert: boolean;
  /** True when the seuil cell was empty and access is not open/variable/hors. */
  seuilInconnu: boolean;
  /** True for post-CPGE / private schools that have no post-Bac seuil at all. */
  horsPreselection: boolean;
  /** Short FR note shown with estimates, e.g. "Estimation — seuil publié après admission". */
  estimationSource: string | null;
  places: number | null;
  site: string | null;
  notes: string | null;
  /** URL slug for the detail page (written by the converter; app also derives it). */
  slug?: string;
};

/** Eligibility verdict for one establishment given a student's average. */
export type EligibiliteStatut =
  | "convocable"
  | "limite"
  | "accesOuvert"
  | "enDessous"
  | "seuilInconnu"
  // Variable cutoff (sur dossier) evaluated against an estimate.
  | "selectionDossier"
  // Post-CPGE / private — no post-Bac seuil; informational only.
  | "horsPreselection";

/** A scored match returned by the simulator. */
export type ResultatMatch = {
  etablissement: Etablissement;
  statut: EligibiliteStatut;
  /** moyenne − effective seuil when a numeric seuil applies, else null. */
  marge: number | null;
  /** True when the applied seuil is an estimate. */
  estime: boolean;
  /** The effective seuil compared against (per-track value, global, or estimate). */
  seuilApplique: number | null;
  /** Track code whose per-track seuil was applied (e.g. "SVT"), or null if global. */
  trackSeuil: string | null;
};
