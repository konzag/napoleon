import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (name) => fs.readFileSync(new URL(name, root), 'utf8');
const exists = (name) => fs.existsSync(new URL(name, root));

assert.equal(exists('anatomy-game/anatomy.html'), true, 'anatomy.html exists');
assert.equal(exists('anatomy-game/css/anatomy.css'), true, 'anatomy.css exists');
assert.equal(exists('anatomy-game/js/anatomy.js'), true, 'anatomy.js exists');
assert.equal(exists('anatomy-game/index.html'), false, 'no index.html in anatomy-game');

const html = read('anatomy-game/anatomy.html');
const css = read('anatomy-game/css/anatomy.css');
const js = read('anatomy-game/js/anatomy.js');

assert.match(html, /<link rel="icon" href="data:image\/svg\+xml/, 'inline svg favicon exists');
assert.match(html, /Ναπολέων/, 'default profile is Napoleon');
assert.match(html, /<nav id="top-nav"/, 'shared top navigation exists');
assert.match(html, /<aside class="sidebar"/, 'left sidebar exists');
assert.match(html, /href="\.\.\/index\.html"/, 'anatomy links to encyclopedia');
assert.match(html, /href="\.\.\/diablo-game\/diablo\.html"/, 'anatomy links to diablo');
assert.match(html, /href="\.\.\/school-game\/school\.html"/, 'anatomy links to school');
assert.match(html, /href="\.\.\/farm-game\/farm\.html"/, 'anatomy links to farm');
assert.match(html, /href="\.\.\/jedi-game\/jedi\.html"/, 'anatomy links to jedi nature page');
assert.match(html, /<script src="\.\.\/assets\/storage\.js"><\/script>\s*<script src="js\/anatomy\.js">/, 'storage.js loads before anatomy.js');

for (const text of [
  'Προφίλ',
  'Εξερεύνηση Σώματος',
  'Τοποθέτηση Οργάνων',
  '5 Αισθήσεις',
  'Πέψη',
  'Υγιεινές Συνήθειες',
  'Συλλογές',
  'Πρόοδος',
]) {
  assert.match(html, new RegExp(text), `sidebar contains ${text}`);
}

for (const text of ['Καρδούλης', 'Πνευμονάκια', 'Κύριος Σκελετούλης', 'Νευρωνάκι', 'Γιατρός Πίξελ']) {
  assert.match(html + js, new RegExp(text), `content contains ${text}`);
}

for (const name of ['loadState', 'saveState', 'selectOrgan', 'discoverOrgan', 'handleOrganDrop', 'setupPlayerMode', 'runDigestion']) {
  assert.match(js, new RegExp(`function\\s+${name}\\s*\\(`), `${name} exists`);
}
assert.doesNotMatch(js, /localStorage\./, 'anatomy.js uses NapoleonStorage instead of raw localStorage');

assert.match(css, /\.sidebar/, 'sidebar css exists');
assert.match(css, /@media/, 'responsive css exists');

console.log('anatomy-smoke: ok');
