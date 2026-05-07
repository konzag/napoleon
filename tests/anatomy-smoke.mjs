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
assert.match(html, /href="\.\.\/diablo\.html"/, 'anatomy links to diablo');
assert.match(html, /href="\.\.\/school\.html"/, 'anatomy links to school');
assert.match(html, /href="\.\.\/farm\.html"/, 'anatomy links to farm');
assert.match(html, /href="home\.html"/, 'return to menu placeholder exists');

for (const text of [
  'Προφίλ Ναπολέοντα',
  'Το Σώμα μου',
  'Μέρη του Σώματος',
  'Όργανα',
  'Σκελετός',
  'Οι 5 Αισθήσεις',
  'Αναπνοή',
  'Καρδιά & Αίμα',
  'Πέψη',
  'Κίνηση',
  'Υγιεινές Συνήθειες',
  'Συλλογές',
  'Πρόοδος',
  'Ρυθμίσεις',
  'Επιστροφή στο Μενού',
]) {
  assert.match(html, new RegExp(text), `sidebar contains ${text}`);
}

for (const text of [
  'Καρδούλης',
  'Πνευμονάκια',
  'Κύριος Σκελετούλης',
  'Νευρωνάκι',
  'Γιατρός Πίξελ',
  'Βάλε την καρδιά στη θέση της',
  'Βοήθησε τους πνεύμονες να πάρουν αέρα',
  'Ταξίδεψε την μπουκιά από το στόμα στο στομάχι',
  'Άναψε τις 5 αισθήσεις',
]) {
  assert.match(html + js, new RegExp(text), `content contains ${text}`);
}

for (const name of ['saveProgress', 'loadProgress', 'selectBodyPart', 'completeDiscovery', 'dropOrgan', 'switchPlayer']) {
  assert.match(js, new RegExp(`function\\s+${name}\\s*\\(`), `${name} exists`);
}

assert.match(css, /\.sidebar/, 'sidebar css exists');
assert.match(css, /@media/, 'responsive css exists');

for (const file of ['index.html', 'diablo.html', 'school.html', 'farm.html']) {
  const page = read(file);
  assert.match(page, /href="anatomy-game\/anatomy\.html"/, `${file} links to anatomy game`);
}
