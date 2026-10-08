// site-smoke.mjs — γρήγοροι έλεγχοι για όλο το site:
//   1. Κάθε τοπικός σύνδεσμος (href/src) δείχνει σε αρχείο που υπάρχει.
//   2. Κάθε σελίδα παιχνιδιού έχει σύνδεσμο προς όλες τις άλλες.
//   3. Κανένα παιχνίδι δεν αγγίζει απευθείας το localStorage (μόνο μέσω assets/storage.js).
//   4. Το storage.js δεν «σπάει» όταν ο browser απαγορεύει ή γεμίζει την αποθήκευση.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

const pages = [
  'index.html',
  'diablo-game/diablo.html',
  'school-game/school.html',
  'farm-game/farm.html',
  'anatomy-game/anatomy.html',
  'jedi-game/jedi.html',
];

assert.equal(fs.existsSync(path.join(root, 'assets/app.js')), false, 'dead assets/app.js was removed');

for (const page of pages) {
  const html = read(page);
  const dir = path.dirname(path.join(root, page));
  const refs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(https?:|data:|mailto:|#)/.test(ref)) continue;
    const target = path.resolve(dir, ref.split('#')[0].split('?')[0]);
    assert.ok(fs.existsSync(target), `${page}: local link "${ref}" exists`);
  }
  const linked = new Set(
    refs.filter((r) => r.endsWith('.html')).map((r) => path.relative(root, path.resolve(dir, r)).split(path.sep).join('/')),
  );
  for (const other of pages) {
    if (other === page) continue;
    assert.ok(linked.has(other), `${page} links to ${other}`);
  }
  if (/NapoleonStorage\./.test(html)) {
    assert.match(html, /<script src="(\.\.\/)?assets\/storage\.js"><\/script>/, `${page} loads assets/storage.js`);
  }
}

const scripts = [...pages, 'anatomy-game/js/anatomy.js'];
for (const file of scripts) {
  const code = read(file).replace(/\/\/.*$/gm, '');
  assert.doesNotMatch(code, /localStorage\.(get|set|remove)Item/, `${file} uses NapoleonStorage, not raw localStorage`);
}

// storage.js: δοκιμάζουμε με ένα «χαλασμένο» localStorage.
const storageSrc = read('assets/storage.js');
function loadStorage(localStorage) {
  const window = { localStorage };
  vm.runInNewContext(storageSrc, { window, console: { warn() {} }, JSON });
  return window.NapoleonStorage;
}
const throwing = loadStorage({
  getItem() { throw new Error('SecurityError'); },
  setItem() { throw new Error('QuotaExceededError'); },
});
assert.deepEqual(throwing.readJson('k', []), [], 'readJson falls back when storage throws');
assert.equal(throwing.writeJson('k', [1]), false, 'writeJson reports failure instead of throwing');

const mem = new Map();
const working = loadStorage({ getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, v) });
assert.equal(working.writeJson('k', { a: 1 }), true);
assert.deepEqual(working.readJson('k', null), { a: 1 });
mem.set('bad', '{not json');
assert.deepEqual(working.readJson('bad', {}), {}, 'corrupt JSON falls back');

console.log('site-smoke: ok');
