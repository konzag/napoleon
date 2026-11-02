// school-page.test.mjs: the Jedi Academy (school-game/school.html) for the school year 2026-27 (L1-37).
// Run: node --test tests/school-page.test.mjs   (CI runs every tests/*.mjs)
//   1. Napoleon is in Β' Δημοτικού (owner answer L5-05): that tab is open first and starred,
//      and its links go to the Β' material (stintaxi.com and wordwall.net).
//   2. The fonts sit in the repo (school-game/fonts/*.woff2 + OFL.txt): no stylesheet or font from elsewhere.
// That every link answers is checked by tools/check-links.mjs in the CI job «links» (needs the internet).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(path.join(root, 'school-game/school.html'), 'utf8');

const CLASS = { grade: 'b', label: "Β'" };
const LINKS = [
  'https://www.stintaxi.com/beta-tau940xieta.html',
  'https://wordwall.net/el-gr/community/%CE%B2-%CE%B4%CE%B7%CE%BC%CE%BF%CF%84%CE%B9%CE%BA%CE%BF%CF%85',
];

const tabs = [...html.matchAll(/<button\b[^>]*class="grade-tab-btn[^"]*"[^>]*>[\s\S]*?<\/button>/g)].map((m) => m[0]);
const isActive = (tag) => /class="[^"]*\bactive\b/.test(tag);

test("2026-27: only the Β' tab is active and starred", () => {
  assert.equal(tabs.length, 6, "six grade tabs (Α' to ΣΤ')");
  const active = tabs.filter(isActive);
  assert.equal(active.length, 1, 'exactly one active tab');
  assert.match(active[0], new RegExp(`data-grade="${CLASS.grade}"`));
  assert.match(active[0], />\s*Β' Δημοτικού ⭐\s*</);
  for (const t of tabs.filter((x) => !isActive(x))) assert.doesNotMatch(t, /⭐/, `only this year's class is starred: ${t}`);
});

test("2026-27: the Β' grade is the one shown first", () => {
  const panels = [...html.matchAll(/<div class="grade-content([^"]*)" id="grade-([a-z]+)"/g)];
  assert.equal(panels.length, 6);
  assert.deepEqual(panels.filter((m) => /\bactive\b/.test(m[1])).map((m) => m[2]), [CLASS.grade]);
});

test("2026-27: the greeting names Β' Δημοτικού and the school year", () => {
  const subtitle = html.match(/<p class="subtitle">([\s\S]*?)<\/p>/)[1];
  assert.match(subtitle, /Β' Δημοτικού/);
  assert.match(subtitle, /2026-27/);
  assert.doesNotMatch(subtitle, /Α'/);
});

test("the Β' grade links to the Β' material on stintaxi and wordwall", () => {
  const panel = html.match(new RegExp(`id="grade-${CLASS.grade}"[\\s\\S]*?(?=<!-- =====)`))[0];
  assert.deepEqual([...panel.matchAll(/href="([^"]+)"/g)].map((m) => m[1]), LINKS);
  assert.match(panel, /Β' Τάξη/);
  assert.match(panel, /Παιχνίδια Β' Δημοτικού/);
});

test("no external stylesheet or font: only the repo's own fonts/comfortaa.css", () => {
  assert.doesNotMatch(html, /fonts\.googleapis|fonts\.gstatic|\/\/[^"')\s]*\.(css|woff2?|ttf|otf)\b/i);
  for (const tag of html.match(/<link\b[^>]*>/g) || []) assert.doesNotMatch(tag, /rel="?stylesheet/i, tag);
  const imports = [...html.matchAll(/@import\s+url\(\s*['"]?([^'")]+)/g)].map((m) => m[1]);
  assert.deepEqual(imports, ['fonts/comfortaa.css'], 'one relative @import, from this repo');
});

test('the font files sit next to the page, with their OFL licence', () => {
  const dir = path.join(root, 'school-game/fonts');
  const css = readFileSync(path.join(dir, 'comfortaa.css'), 'utf8');
  const urls = [...css.matchAll(/url\(\s*['"]?([^'")]+)/g)].map((m) => m[1]);
  assert.ok(urls.length >= 2, 'at least the Greek and the Latin file');
  for (const u of urls) {
    assert.doesNotMatch(u, /^(https?:)?\/\//, `local file, not ${u}`);
    assert.match(u, /\.woff2$/);
    assert.ok(existsSync(path.join(dir, u)), `school-game/fonts/${u} exists`);
  }
  assert.match(css, /unicode-range:\s*U\+0370/, 'the Greek subset is there');
  const ofl = readFileSync(path.join(dir, 'OFL.txt'), 'utf8');
  assert.match(ofl, /SIL OPEN FONT LICENSE Version 1\.1/i);
  assert.match(ofl, /Comfortaa/);
});
