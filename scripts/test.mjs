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
const { evaluer, simuler, normalizeVille } = await import(path.join(ROOT, "src/lib/admission.ts"));

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

test("track not in per-track seuils ⇒ excluded (null)", () => {
  // FMPC has per-track seuils for SM/PC/SVT only.
  assert.equal(evaluer(find("FMPC"), 19, "LSH"), null);
});
test("per-track: SM and SVT get DIFFERENT verdicts for the same ENSA", () => {
  const ag = find("ENSA Agadir"); // SM 12, SVT 15
  const sm = evaluer(ag, 13, "SM");
  const svt = evaluer(ag, 13, "SVT");
  assert.equal(sm.statut, "convocable");
  assert.equal(sm.seuilApplique, 12);
  assert.equal(sm.trackSeuil, "SM");
  assert.equal(svt.statut, "enDessous");
  assert.equal(svt.seuilApplique, 15);
});
test("above seuil ⇒ convocable + applied per-track seuil + estimate flag", () => {
  const r = evaluer(find("FMPC"), 18, "SM");
  assert.equal(r.statut, "convocable");
  assert.equal(r.seuilApplique, 17.6);
  assert.equal(r.trackSeuil, "SM");
  assert.equal(r.estime, true);
});
test("just below seuil (within 0.5) ⇒ limite", () => {
  const seuil = find("ENSA Safi").seuil2025; // 14.9, single seuil
  assert.equal(evaluer(find("ENSA Safi"), seuil - 0.3, "SM").statut, "limite");
});
test("well below seuil ⇒ enDessous", () => {
  assert.equal(evaluer(find("ENSA Safi"), 10, "SM").statut, "enDessous");
});
test("open-access faculty ⇒ accesOuvert regardless of average", () => {
  assert.equal(evaluer(find("FLSH Rabat"), 8, "LSH").statut, "accesOuvert");
});
test("empty seuil ⇒ seuilInconnu", () => {
  assert.equal(evaluer(find("ENSA Tétouan"), 20, "SM").statut, "seuilInconnu");
});
test("variable (sur dossier) ⇒ selectionDossier + estimate", () => {
  const r = evaluer(find("EST Salé"), 14, "SM");
  assert.equal(r.statut, "selectionDossier");
  assert.equal(r.estime, true);
  assert.ok(r.seuilApplique !== null);
});
test("post-CPGE / private ⇒ horsPreselection, no number", () => {
  const r = evaluer(find("EMI"), 19, "SM");
  assert.equal(r.statut, "horsPreselection");
  assert.equal(r.seuilApplique, null);
});
test("normalizeVille is accent-insensitive (Fès === Fes)", () => {
  assert.equal(normalizeVille("Fès"), normalizeVille("Fes"));
});
test("simuler groups into the new buckets + sorts convocable by margin", () => {
  const g = simuler(DATA, 15.5, "SM");
  assert.ok(g.convocable.length > 0);
  assert.ok(g.horsPreselection.length > 0);
  assert.ok(g.selectionDossier.length > 0);
  for (let i = 1; i < g.convocable.length; i++) {
    assert.ok(g.convocable[i - 1].marge >= g.convocable[i].marge);
  }
});

console.log(`\n${failed ? "❌" : "✅"} ${passed} passed, ${failed} failed\n`);
process.exit(failed ? 1 : 0);
