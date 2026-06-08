// Pure calculator math for the two averages students confuse.
// Kept framework-free and side-effect-free so it's trivial to test/reason about.

/** Clamp a grade into the valid [0, 20] Moroccan scale. */
export function clamp20(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.min(20, Math.max(0, n));
}

/**
 * Mode A — Moyenne de présélection (grandes écoles).
 * This is the value compared to the seuils on cursussup and fed to the simulator.
 *   Moyenne de présélection = 0.75 × National + 0.25 × Régional
 */
export function moyennePreselection(national: number, regional: number): number {
  return 0.75 * national + 0.25 * regional;
}

/**
 * Mode B — Moyenne du BAC (le diplôme).
 *   Moyenne du BAC = 0.25 × Régional + 0.25 × Contrôle continu + 0.50 × National
 */
export function moyenneBac(
  regional: number,
  controleContinu: number,
  national: number
): number {
  return 0.25 * regional + 0.25 * controleContinu + 0.5 * national;
}

/**
 * Reverse — "how much do I need at the National exam to PASS the Bac?"
 * Passing = moyenne du Bac ≥ cible (10 by default).
 *   cible = 0.25 × Régional + 0.25 × Contrôle continu + 0.50 × National
 *   ⇒ National = (cible − 0.25 × Régional − 0.25 × Contrôle continu) / 0.50
 * Example: Régional 15 + Contrôle continu 15 ⇒ N = (10 − 3.75 − 3.75) / 0.5 = 5.
 * Returns the raw required score (may be < 0 or > 20, which the caller flags).
 */
export function nationalRequisPourReussirBac(
  regional: number,
  controleContinu: number,
  cible: number = 10
): number {
  return (cible - 0.25 * regional - 0.25 * controleContinu) / 0.5;
}

/** Round to 2 decimals for display without floating-point noise. */
export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/** Format a grade for display: 2 decimals, comma separator (FR/AR friendly). */
export function formatNote(n: number | null, lang: "fr" | "ar" = "fr"): string {
  if (n === null || Number.isNaN(n)) return "—";
  const fixed = round2(n).toFixed(2);
  // Both FR and AR locales in Morocco commonly read the comma decimal.
  return lang === "ar" ? fixed : fixed.replace(".", ",");
}
