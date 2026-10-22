// lego-saves.test.mjs — the LEGO builder of the encyclopedia (index.html) keeps the child's builds in
// localStorage key `napoleon_lego_saves` (max 345). These tests save, reload, load and delete builds in the
// fake browser of helpers/fake-dom.mjs, with ONE fake localStorage shared by the two page loads.
// Run: node --test tests/lego-saves.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPage, memoryStorage } from './helpers/fake-dom.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KEY = 'napoleon_lego_saves';

// Open the encyclopedia with the given storage; collect alerts instead of showing them; open the LEGO builder.
function openLego(storage) {
  const page = loadPage(root, 'index.html', { localStorage: storage });
  const alerts = [];
  page.window.alert = (msg) => alerts.push(String(msg));
  page.window.console = { ...console, warn() {} }; // storage.js warns on a failed write; keep the output clean
  page.document.getElementById('lego-toggle-btn').click();
  const cells = page.document.querySelectorAll('.lego-cell');
  assert.equal(cells.length, 80, 'the 10x8 LEGO grid is built');
  return { ...page, alerts, cells };
}

// Pick palette colour number `i`, then paint the given cells with it (a mouse press on each cell).
function paint(lego, i, cellNumbers) {
  lego.document.querySelectorAll('.palette-color')[i].click();
  for (const n of cellNumbers) lego.cells[n].dispatch('mousedown');
}

function save(lego, name) {
  lego.document.getElementById('lego-design-name').value = name;
  lego.document.getElementById('lego-confirm-save-btn').click();
}

// The load panel lists the saves newest first: [{ name, del }] (del = the 🗑️ button).
function listed(lego) {
  lego.document.getElementById('lego-load-btn').click();
  return lego.document.getElementById('lego-saves-list').children.map((item) => ({
    name: item.children[1].children[0].textContent,
    del: item.children[3],
  }));
}

const stored = (storage) => JSON.parse(storage.getItem(KEY));
const counter = (lego) => lego.document.getElementById('lego-counter').textContent;

test('save two builds, reload, both listed; delete one keeps the other', () => {
  const storage = memoryStorage();
  const first = openLego(storage);
  paint(first, 0, [0, 1, 2]);
  save(first, 'A');
  first.document.getElementById('lego-clear-btn').click();
  paint(first, 3, [10, 79]);
  save(first, 'B');
  assert.deepEqual(first.alerts, []);
  assert.equal(counter(first), '2/345 αποθηκευμένα 🧱');
  const before = stored(storage);
  assert.deepEqual(before.map((s) => s.name), ['A', 'B']);
  const bColors = before[1].colors;
  assert.equal(bColors.length, 80);
  assert.equal(bColors.filter(Boolean).length, 2, 'B has its 2 painted bricks');
  assert.notEqual(bColors[10], before[0].colors[0], 'A and B use different colours');

  // Reload the page: the same storage, a fresh page.
  const second = openLego(storage);
  assert.equal(counter(second), '2/345 αποθηκευμένα 🧱', 'counter after reload');
  const items = listed(second);
  assert.deepEqual(items.map((i) => i.name), ['B', 'A'], 'both listed, newest first');

  // Load A onto the grid: its three bricks come back.
  second.document.getElementById('lego-saves-list').children[1].children[2].click();
  assert.deepEqual(
    second.cells.map((c) => c.style.background || null),
    before[0].colors,
    'loading A paints A',
  );

  // Delete A (🗑️ of A): only B stays, with B's colours unchanged.
  listed(second).find((i) => i.name === 'A').del.click();
  const after = stored(storage);
  assert.deepEqual(after.map((s) => s.name), ['B']);
  assert.deepEqual(after[0].colors, bColors, "B's colours unchanged");
  assert.equal(counter(second), '1/345 αποθηκευμένα 🧱');
  assert.deepEqual(listed(second).map((i) => i.name), ['B']);
});

test('the 346th build is refused and the 345 stay', () => {
  const storage = memoryStorage();
  const full = Array.from({ length: 345 }, (_, i) => ({ name: `Σχέδιο ${i + 1}`, date: '1/1/2026', colors: [i % 2 ? '#e3000b' : null] }));
  storage.setItem(KEY, JSON.stringify(full));
  const raw = storage.getItem(KEY);

  const lego = openLego(storage);
  assert.equal(counter(lego), '345/345 αποθηκευμένα 🧱');
  paint(lego, 0, [5]);
  save(lego, 'Ένα ακόμα');
  assert.equal(lego.alerts.length, 1, 'one alert');
  assert.match(lego.alerts[0], /^Γέμισες τη συλλογή σου!/);
  assert.equal(storage.getItem(KEY), raw, 'stored saves byte-identical');
  assert.equal(stored(storage).length, 345);
  assert.equal(counter(lego), '345/345 αποθηκευμένα 🧱');
});

test('quota error keeps the old builds and tells the child', () => {
  const storage = memoryStorage();
  const old = [{ name: 'Πύργος', date: '1/1/2026', colors: ['#0055bf', null] }];
  storage.setItem(KEY, JSON.stringify(old));
  const raw = storage.getItem(KEY);

  const lego = openLego(storage);
  assert.equal(counter(lego), '1/345 αποθηκευμένα 🧱');
  storage.setItem = () => {
    throw Object.assign(new Error('The quota has been exceeded.'), { name: 'QuotaExceededError' });
  };
  paint(lego, 2, [0, 1]);
  save(lego, 'Νέο');
  assert.equal(lego.alerts.length, 1, 'one alert');
  assert.match(lego.alerts[0], /^Δεν χωράει άλλο σχέδιο/);
  assert.equal(storage.getItem(KEY), raw, 'old builds unchanged');
  assert.equal(counter(lego), '1/345 αποθηκευμένα 🧱', 'counter unchanged');
  assert.equal(lego.document.getElementById('lego-design-name').value, 'Νέο', 'the name stays so the child can retry');
});
