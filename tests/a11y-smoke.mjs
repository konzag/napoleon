// a11y-smoke.mjs — έλεγχοι προσβασιμότητας (a11y) και μικρών bugs που διορθώθηκαν:
//   1. Κάθε σελίδα λέει ότι είναι στα ελληνικά (lang="el").
//   2. Τα χρώματα κειμένου έχουν αρκετή αντίθεση (WCAG AA, 4.5:1).
//   3. Τα κουμπιά-κάρτες δουλεύουν και με πληκτρολόγιο.
//   4. Υπάρχει «λιγότερη κίνηση» (prefers-reduced-motion) όπου έχει animations.
//   5. Συγκεκριμένα bugs δεν ξαναγυρίζουν (regression tests).
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
const styleFiles = [...pages, 'assets/styles.css', 'anatomy-game/css/anatomy.css', 'anatomy-game/js/anatomy.js'];

// ── 1. Γλώσσα σελίδας + σωστό og:url ──
for (const page of pages) {
  const html = read(page);
  assert.match(html, /<html lang="el">/, `${page} declares lang="el"`);
  const og = html.match(/property="og:url" content="([^"]+)"/);
  if (og) {
    const expected = 'https://konzag.github.io/napoleon/' + (page === 'index.html' ? '' : page);
    assert.equal(og[1], expected, `${page}: og:url points to the real page`);
  }
}

// ── Χρώματα: κανένα «σπασμένο» hex με 5 ή 7 ψηφία (ο browser το αγνοεί) ──
for (const file of styleFiles) {
  const bad = read(file).match(/#[0-9a-fA-F]{5}\b|#[0-9a-fA-F]{7}\b/g);
  assert.equal(bad, null, `${file} has no invalid hex colours (${bad})`);
}

// ── 2. Αντίθεση χρωμάτων (WCAG AA) ──
function luminance(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}
function cssColor(css, selectorRe) {
  const m = css.match(selectorRe);
  assert.ok(m, `colour found for ${selectorRe}`);
  return m[1];
}
const AA = 4.5;

const styles = read('assets/styles.css');
for (const [name, re] of [
  ['footer', /footer \{[^}]*color: (#[0-9a-fA-F]{3,6})/],
  ['.lego-save-date', /\.lego-save-date \{[^}]*color: (#[0-9a-fA-F]{3,6})/],
  ['.lego-empty-msg', /\.lego-empty-msg \{[^}]*color: (#[0-9a-fA-F]{3,6})/],
]) {
  const c = cssColor(styles, re);
  assert.ok(contrast(c, '#0a0015') >= AA, `styles.css ${name} ${c} has contrast ≥ ${AA}`);
}

const anatomyCss = read('anatomy-game/css/anatomy.css');
const muted = cssColor(anatomyCss, /--muted: (#[0-9a-fA-F]{6})/);
const card = cssColor(anatomyCss, /--card: (#[0-9a-fA-F]{6})/);
const bg = cssColor(anatomyCss, /--bg: (#[0-9a-fA-F]{6})/);
assert.ok(contrast(muted, card) >= AA, `anatomy --muted ${muted} on --card has contrast ≥ ${AA}`);
assert.ok(contrast(muted, bg) >= AA, `anatomy --muted ${muted} on --bg has contrast ≥ ${AA}`);

const diablo = read('diablo-game/diablo.html');
for (const [name, re] of [
  ['.back-btn', /\.back-btn \{[^}]*color: (#[0-9a-fA-F]{3,6})/],
  ['.hud-hints', /\.hud-hints\s*\{[^}]*color:(#[0-9a-fA-F]{3,6})/],
  ['.go-title', /\.go-title \{[^}]*color: (#[0-9a-fA-F]{3,6})/],
]) {
  const c = cssColor(diablo, re);
  assert.ok(contrast(c, '#0a0005') >= AA, `diablo ${name} ${c} has contrast ≥ ${AA}`);
}
assert.doesNotMatch(diablo, /color:#555|color:#666/, 'diablo has no dark-grey inline text');

// ── 3. Πληκτρολόγιο και ονόματα για screen readers ──
const index = read('index.html');
assert.match(index, /card\.setAttribute\('role', 'button'\)[\s\S]*card\.setAttribute\('tabindex', '0'\)/, 'encyclopedia cards are keyboard buttons');
assert.match(index, /swatch\.setAttribute\('aria-label'/, 'LEGO colour swatches have a name');
assert.match(index, /delBtn\.setAttribute\('aria-label'/, 'LEGO delete (🗑️) button has a name');
assert.match(index, /id="lego-design-name"[^>]*aria-label=/, 'LEGO name input has a label');

assert.match(diablo, /id="sound-toggle"[^>]*aria-label=/, 'diablo sound button has a name');
assert.match(diablo, /id="vToggle"[^>]*aria-label=/, 'diablo gamepad toggle has a name');
assert.match(diablo, /card\.setAttribute\('tabindex', '0'\)/, 'diablo hero cards are keyboard-focusable');
// Το 🔊 πρέπει να είναι πάνω από το μενού (πριν κρυβόταν από πίσω του).
const navZ = Number(diablo.match(/#top-nav \{[^}]*z-index: (\d+)/)[1]);
const soundZ = Number(diablo.match(/#sound-toggle \{[^}]*z-index: (\d+)/)[1]);
assert.ok(soundZ > navZ, 'diablo sound button sits above the top nav');
// Space/βελάκια μπλοκάρονται ΜΟΝΟ μέσα στο παιχνίδι.
assert.match(diablo, /if \(!gameRunning\) return;\s*if \(nav\.indexOf\(e\.code\) >= 0\) e\.preventDefault\(\);/,
  'diablo only swallows Space/arrow keys while the game runs');

const jedi = read('jedi-game/jedi.html');
assert.match(jedi, /card\.setAttribute\('tabindex', '0'\)[\s\S]*card\.addEventListener\('keydown'/, 'jedi cards open with the keyboard');

const anatomyHtml = read('anatomy-game/anatomy.html');
const anatomyJs = read('anatomy-game/js/anatomy.js');
assert.doesNotMatch(anatomyHtml, /class="body-svg"[^>]*role="img"/, 'body SVG is not role=img (it would hide its buttons)');
assert.match(anatomyHtml, /id="mascotBubble"[^>]*aria-live=/, 'mascot messages are announced');
assert.match(anatomyJs, /function\s+pickOrgan\s*\(/, 'organs can be placed without dragging (click/keyboard)');
assert.match(anatomyJs, /slot\.setAttribute\('tabindex', '0'\)/, 'organ drop slots are keyboard-focusable');
assert.match(anatomyJs, /card\.setAttribute\('tabindex', '0'\)/, 'journey stations are keyboard-focusable');

assert.match(read('farm-game/farm.html'), /id="commandInput"[^>]*aria-label=/, 'farm command input has a label');

// ── 4. Λιγότερη κίνηση ──
for (const file of ['assets/styles.css', 'diablo-game/diablo.html', 'jedi-game/jedi.html', 'anatomy-game/css/anatomy.css']) {
  assert.match(read(file), /prefers-reduced-motion: reduce/, `${file} respects prefers-reduced-motion`);
}

// ── 5. Regression tests για bugs ──
// Diablo: το heroData δεν έχει maxHp → HUD έδειχνε «120/undefined» και το
// Holy Light του Ιππότη έκανε το HP «NaN» (αθάνατος ήρωας).
assert.doesNotMatch(diablo, /heroData\.maxHp/, 'diablo uses hero.maxHp, not the missing heroData.maxHp');

// Εγκυκλοπαίδεια: ο LEGO builder χτίζεται μία φορά (αλλιώς χανόταν το σχέδιο).
assert.match(index, /if \(!legoBuilderReady\) \{\s*legoBuilderReady = true;\s*initLegoBuilder\(\);/, 'LEGO grid is built only once');

// Σώμα: το σήμα «Υγιεινός Ήρωας» δίνεται και η μέτρηση Συλλογών δεν ξεπερνά το σύνολο.
assert.match(anatomyJs, /collectItem\('all_habits'\)/, 'all_habits badge can be earned');
assert.match(anatomyJs, /current: countCollectedBadges\(\)/, 'collections progress counts only real badges');
assert.match(anatomyJs, /if \(dropSlotsReady\) return;/, 'drop-slot listeners are added only once');

// Αγρόκτημα: τρέχουμε τον πραγματικό κώδικα με ένα μικρό «ψεύτικο» DOM
// και ελέγχουμε ότι το «φάε γεύμα» κάνει κάτι (πριν δεν έγραφε τίποτα).
function fakeElement() {
  const el = {
    children: [], className: '', placeholder: '', value: '', scrollTop: 0, scrollHeight: 0,
    _text: '',
    get textContent() { return this._text + this.children.map((c) => c.textContent).join(''); },
    set textContent(v) { this._text = String(v); this.children = []; },
    get childElementCount() { return this.children.length; },
    get firstElementChild() { return this.children[0]; },
    appendChild(c) { this.children.push(c); return c; },
    append(...cs) { cs.forEach((c) => this.children.push(c)); },
    removeChild(c) { this.children = this.children.filter((x) => x !== c); },
    addEventListener() {},
    focus() {},
  };
  return el;
}
const farmHtml = read('farm-game/farm.html');
const farmScript = farmHtml.match(/<script>([\s\S]*?)<\/script>/)[1];
const elements = new Map();
const document = {
  getElementById(id) { if (!elements.has(id)) elements.set(id, fakeElement()); return elements.get(id); },
  createElement() { return fakeElement(); },
};
const farmCtx = { document, setInterval: () => 1, clearInterval() {}, Date, Math, String, Object, Set };
vm.runInNewContext(farmScript + '\n;globalThis.__farm = { handleCommand, getState: () => state };', farmCtx);
const lines = () => elements.get('terminal').children.map((c) => c.textContent);
farmCtx.__farm.getState().hungerPending = true;
const before = lines().length;
farmCtx.__farm.handleCommand('φάε γεύμα');
const after = lines().slice(before);
assert.ok(after.length >= 2, 'farm: "φάε γεύμα" writes a reply');
assert.match(after.join('\n'), /ξεκουραστεί/, 'farm: "φάε γεύμα" works like a big meal');
assert.equal(farmCtx.__farm.getState().hungerPending, false, 'farm: eating clears hunger');

console.log('a11y-smoke: ok');
