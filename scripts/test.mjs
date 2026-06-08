#!/usr/bin/env node
/**
 * Tiny zero-dependency test runner for the core math + matching logic.
 * Run with:  npm test
 *
 * Uses Node's native TypeScript type-stripping (Node 22.6+/20 with the flag) to
 * import the real source files in src/lib so the tests can't drift from the app.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const {
  moyennePreselection,
  moyenneBac,
  nationalRequisPourReussirBac,
  round2,
} = await import(path.join(ROOT, "src/lib/calcul.ts"));
const { evaluer, simuler } = await import(path.join(ROOT, "src/lib/admission.ts"));

const DATA = JSON.parse(
  fs.readFileSync(path.join(ROOT, "src/data/etablissements.json"), "utf8")
);

let passed = 0;
let failed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${name}\n    ${err.message}`);
  }
}

console.log("\ncalcul.ts");
test("présélection = 0.75·National + 0.25·Régional", () => {
  assert.equal(moyennePreselection(16, 12), 15);
  assert.equal(round2(moyennePreselection(15.4, 13.2)), 14.85);
});
test("moyenne du Bac = 0.25·R + 0.25·CC + 0.50·National", () => {
  assert.equal(moyenneBac(12, 14, 16), 14.5);
});
test("reverse: National needed to pass the Bac (≥10)", () => {
  // R=15, CC=15 → (10 − 3.75 − 3.75)/0.5 = 5
  assert.equal(nationalRequisPourReussirBac(15, 15), 5);
  // R=CC=0 → exactly 20 (the worst still-passable case)
  assert.equal(nationalRequisPourReussirBac(0, 0), 20);
});

console.log("\nadmission.ts");
const find = (sigle) => DATA.find((e) => e.sigle === sigle);

test("track mismatch excludes the school (returns null)", () => {
  // A medicine faculty does not accept LSH.
  assert.equal(evaluer(find("FMPC"), 19, "LSH"), null);
});
test("above seuil ⇒ convocable with positive margin + estimate flag", () => {
  const r = evaluer(find("FMPC"), 18, "SM");
  assert.equal(r.statut, "convocable");
  assert.ok(r.marge > 0);
  assert.equal(r.estime, true);
});
test("just below seuil (within 0.5) ⇒ limite", () => {
  const seuil = find("ENSA Safi").seuil2025; // 14.9
  assert.equal(evaluer(find("ENSA Safi"), seuil - 0.3, "SM").statut, "limite");
});
test("well below seuil ⇒ enDessous", () => {
  const seuil = find("FMPC").seuil2025;
  assert.equal(evaluer(find("FMPC"), seuil - 3, "SM").statut, "enDessous");
});
test("open-access faculty ⇒ accesOuvert regardless of average", () => {
  assert.equal(evaluer(find("FLSH Rabat"), 8, "LSH").statut, "accesOuvert");
});
test("empty seuil ⇒ seuilInconnu", () => {
  assert.equal(evaluer(find("ENSA Tétouan"), 20, "SM").statut, "seuilInconnu");
});
test("simuler groups + sorts (convocable by margin desc, city boosted)", () => {
  const g = simuler(DATA, 15.5, "SM", "Casablanca");
  assert.ok(g.convocable.length > 0);
  // City preference floats a Casablanca school to the top of its group.
  assert.equal(g.convocable[0].etablissement.ville, "Casablanca");
  // convocable sorted by margin descending.
  for (let i = 1; i < g.convocable.length; i++) {
    const prevCity = g.convocable[i - 1].etablissement.ville === "Casablanca";
    const curCity = g.convocable[i].etablissement.ville === "Casablanca";
    if (prevCity === curCity) {
      assert.ok(g.convocable[i - 1].marge >= g.convocable[i].marge);
    }
  }
});

console.log(`\n${failed ? "❌" : "✅"} ${passed} passed, ${failed} failed\n`);
process.exit(failed ? 1 : 0);
