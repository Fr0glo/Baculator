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
  /** Numeric seuil if known or estimated, else null. */
  seuil2025: number | null;
  seuil2024: number | null;
  seuil2023: number | null;
  /** True when the 2025 seuil started with "≈" (an estimate). */
  seuilEstime: boolean;
  /** True when access is open ("N/A" in the sheet): no seuil needed. */
  accesOuvert: boolean;
  /** True when the 2025 seuil cell was empty and access is not open. */
  seuilInconnu: boolean;
  places: number | null;
  site: string | null;
  notes: string | null;
};

/** Eligibility verdict for one establishment given a student's average. */
export type EligibiliteStatut =
  | "convocable"
  | "limite"
  | "accesOuvert"
  | "enDessous"
  | "seuilInconnu";

/** A scored match returned by the simulator. */
export type ResultatMatch = {
  etablissement: Etablissement;
  statut: EligibiliteStatut;
  /** moyenne − seuil when a numeric seuil exists, else null. */
  marge: number | null;
  /** True when the matched seuil is an estimate. */
  estime: boolean;
};
