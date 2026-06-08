import type { FiliereCode } from "./types";

/** Bac tracks with human-readable labels (FR + AR) for dropdowns. */
export const FILIERES: { code: FiliereCode; fr: string; ar: string }[] = [
  { code: "SM", fr: "Sciences Mathématiques", ar: "العلوم الرياضية" },
  { code: "PC", fr: "Sciences Physiques", ar: "العلوم الفيزيائية" },
  { code: "SVT", fr: "Sciences de la Vie et de la Terre", ar: "علوم الحياة والأرض" },
  { code: "SAgr", fr: "Sciences Agronomiques", ar: "العلوم الزراعية" },
  { code: "STE", fr: "Sciences et Technologies Électriques", ar: "العلوم والتكنولوجيا الكهربائية" },
  { code: "STM", fr: "Sciences et Technologies Mécaniques", ar: "العلوم والتكنولوجيا الميكانيكية" },
  { code: "SGC", fr: "Sciences de Gestion Comptable", ar: "علوم التدبير المحاسباتي" },
  { code: "SE", fr: "Sciences Économiques", ar: "العلوم الاقتصادية" },
  { code: "LSH", fr: "Lettres et Sciences Humaines", ar: "الآداب والعلوم الإنسانية" },
];

/** Quick lookup: code → labels. */
export const FILIERE_MAP: Record<string, { fr: string; ar: string }> =
  Object.fromEntries(FILIERES.map((f) => [f.code, { fr: f.fr, ar: f.ar }]));

/** Label for a track code in the active language (falls back to the code). */
export function filiereLabel(code: string, lang: "fr" | "ar"): string {
  if (code === "ALL") return lang === "fr" ? "Toutes filières" : "كل الشعب";
  return FILIERE_MAP[code]?.[lang] ?? code;
}
