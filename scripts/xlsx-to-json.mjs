#!/usr/bin/env node
/**
 * xlsx-to-json.mjs
 * ----------------
 * Converts the owner's spreadsheet `Etablissements_Maroc_BAC.xlsx`
 * (sheet `Etablissements`) into `src/data/etablissements.json`,
 * the file the website actually reads.
 *
 * Usage:
 *   1. Drop the spreadsheet in  ./data/Etablissements_Maroc_BAC.xlsx
 *   2. Run:  npm run data
 *
 * If the spreadsheet is missing, the script leaves the committed sample
 * `src/data/etablissements.json` untouched so the site always builds.
 *
 * Expected column headers (exact):
 *   ID, Etablissement, Sigle, Ville, "Universite / Tutelle", Secteur, Domaine,
 *   "Type d'acces", "Filieres Bac acceptees", "Concours apres preselection",
 *   "Seuil 2025", "Seuil 2024", "Seuil 2023", "Nb de places 2025", "Site web", Notes
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const XLSX_PATH = path.join(ROOT, "data", "Etablissements_Maroc_BAC.xlsx");
const SHEET_NAME = "Etablissements";
const OUT_PATH = path.join(ROOT, "src", "data", "etablissements.json");

// Canonical track codes accepted by the app.
const KNOWN_FILIERES = new Set([
  "SM",
  "PC",
  "SVT",
  "SAgr",
  "STE",
  "STM",
  "SGC",
  "SE",
  "LSH",
]);

// Tolerant alias map so small spelling variations in the sheet still normalize.
const FILIERE_ALIASES = {
  sm: "SM",
  pc: "PC",
  svt: "SVT",
  sagr: "SAgr",
  ste: "STE",
  stm: "STM",
  sgc: "SGC",
  se: "SE",
  lsh: "LSH",
};

/** Trim a cell to a non-empty string, or return null. */
function str(v) {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  return s.length ? s : null;
}

/** Parse the "Filieres Bac acceptees" cell into normalized codes. */
function parseFilieres(raw) {
  const s = str(raw);
  if (!s) return [];
  const lower = s.toLowerCase();
  // "Toutes filieres" (with or without accents) → matches every track.
  if (lower.includes("toutes")) return ["ALL"];
  // Free text like "Variable selon filiere" cannot be matched precisely;
  // keep it open so the school still surfaces, with a note in the UI.
  if (lower.includes("variable")) return ["ALL"];

  const out = [];
  for (const part of s.split(",")) {
    const token = part.trim();
    if (!token) continue;
    if (KNOWN_FILIERES.has(token)) {
      out.push(token);
      continue;
    }
    const alias = FILIERE_ALIASES[token.toLowerCase()];
    if (alias) out.push(alias);
    // Unknown tokens are dropped silently (kept out of matching).
  }
  // De-duplicate while preserving order.
  return [...new Set(out)];
}

/**
 * Parse a seuil cell into { value, estime, ouvert, inconnu }.
 *  - plain number            → { value:n, estime:false }
 *  - "≈14.20" / "~14.2"      → { value:n, estime:true }
 *  - "N/A" / "NA"            → { ouvert:true }
 *  - empty                   → { inconnu:true }  (for the 2025 column)
 */
function parseSeuil(raw) {
  const s = str(raw);
  if (!s) return { value: null, estime: false, ouvert: false, inconnu: true };

  const upper = s.toUpperCase();
  if (upper === "N/A" || upper === "NA" || upper === "ACCÈS OUVERT" || upper === "ACCES OUVERT") {
    return { value: null, estime: false, ouvert: true, inconnu: false };
  }

  // An estimate is flagged with ≈ or ~ at the start.
  const estime = /^[≈~]/.test(s);
  // Extract the first number (handles "≈14,20", "14.5", "14,5/20", etc.).
  const match = s.replace(",", ".").match(/-?\d+(\.\d+)?/);
  if (!match) {
    return { value: null, estime: false, ouvert: false, inconnu: true };
  }
  return {
    value: Number(match[0]),
    estime,
    ouvert: false,
    inconnu: false,
  };
}

/** Normalize an integer-ish cell (places) into a number or null. */
function parseInt0(raw) {
  const s = str(raw);
  if (!s) return null;
  const match = s.replace(/[^\d.-]/g, "");
  if (!match) return null;
  const n = Number(match);
  return Number.isFinite(n) ? Math.round(n) : null;
}

/** Normalize the Secteur cell to the union type. */
function parseSecteur(raw) {
  const s = (str(raw) || "").toLowerCase();
  return s.startsWith("priv") ? "Prive" : "Public";
}

/** Accent-stripped kebab-case (must match src/lib/slug.ts). */
function kebab(input) {
  return String(input)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Assign deterministic, unique slugs (sigle-based, collision-suffixed). */
function assignSlugs(rows) {
  const seen = new Set();
  for (const r of rows) {
    const base = kebab(r.sigle || r.nom) || `ecole-${r.id}`;
    let slug = base;
    let n = 2;
    while (seen.has(slug)) slug = `${base}-${n++}`;
    seen.add(slug);
    r.slug = slug;
  }
  return rows;
}

/** Convert one spreadsheet row (keyed by header) into an Etablissement. */
function normalizeRow(row, index) {
  const seuil2025 = parseSeuil(row["Seuil 2025"]);
  const seuil2024 = parseSeuil(row["Seuil 2024"]);
  const seuil2023 = parseSeuil(row["Seuil 2023"]);

  return {
    id: parseInt0(row["ID"]) ?? index + 1,
    nom: str(row["Etablissement"]) ?? "—",
    sigle: str(row["Sigle"]) ?? "",
    ville: str(row["Ville"]) ?? "—",
    universite: str(row["Universite / Tutelle"]) ?? "",
    secteur: parseSecteur(row["Secteur"]),
    domaine: str(row["Domaine"]) ?? "Autre",
    typeAcces: str(row["Type d'acces"]) ?? "",
    filieres: parseFilieres(row["Filieres Bac acceptees"]),
    seuil2025: seuil2025.value,
    seuil2024: seuil2024.value,
    seuil2023: seuil2023.value,
    seuilEstime: seuil2025.estime,
    accesOuvert: seuil2025.ouvert,
    seuilInconnu: seuil2025.inconnu,
    places: parseInt0(row["Nb de places 2025"]),
    site: str(row["Site web"]),
    notes: str(row["Notes"]),
  };
}

function main() {
  if (!fs.existsSync(XLSX_PATH)) {
    console.warn(
      `\n⚠️  Spreadsheet not found at:\n   ${XLSX_PATH}\n` +
        `   Keeping the existing sample at src/data/etablissements.json.\n` +
        `   To update real data: drop the xlsx in /data and re-run "npm run data".\n`
    );
    process.exit(0);
  }

  const wb = XLSX.readFile(XLSX_PATH);
  const sheet = wb.Sheets[SHEET_NAME];
  if (!sheet) {
    console.error(
      `\n❌ Sheet "${SHEET_NAME}" not found. Sheets present: ${wb.SheetNames.join(", ")}\n`
    );
    process.exit(1);
  }

  // defval:"" keeps empty cells as empty strings (so parseSeuil sees them).
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: true });
  const data = assignSlugs(
    rows
      .map(normalizeRow)
      // Drop fully empty rows (no establishment name).
      .filter((r) => r.nom && r.nom !== "—")
  );

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");

  console.log(`\n✅ Wrote ${data.length} establishments → ${path.relative(ROOT, OUT_PATH)}\n`);
}

main();
