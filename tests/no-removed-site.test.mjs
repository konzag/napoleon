// no-removed-site.test.mjs: the external word-game site («word» + «wall») is gone from this repo
// (owner decision 16/11, DECISIONS §4). Run: node --test tests/no-removed-site.test.mjs
// No file of the repo (pages, scripts, config, tests, docs) names it any more: no link, no button, no CSS class.
// The word is built from two pieces so that this test does not find itself.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const NEEDLE = ["word", "wall"].join("");
// Φάκελοι που δεν είναι του repo (εγκαταστάσεις, αποτελέσματα από τοπικά τρεξίματα)
const SKIP = new Set([".git", "node_modules", ".venv", "venv", "test-results", "playwright-report", "__pycache__"]);
const TEXT = /\.(html?|m?js|ts|css|json|md|ya?ml|py|txt|sh|svg)$|^[^.]+$|^\.[a-z-]+$/i;

function* files(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* files(p);
    else if (TEXT.test(e.name)) yield p;
  }
}

test("no file in the repo names the removed word-game site", () => {
  const hits = [];
  let scanned = 0;
  for (const f of files(ROOT)) {
    scanned++;
    if (readFileSync(f, "utf8").toLowerCase().includes(NEEDLE)) hits.push(relative(ROOT, f));
  }
  assert.ok(scanned > 10, `the scan saw the repo (${scanned} files)`);
  assert.deepEqual(hits, [], `still named in: ${hits.join(", ")}`);
});
