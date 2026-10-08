import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (name) => fs.readFileSync(new URL(name, root), 'utf8');

const farm = read('farm-game/farm.html');

for (const name of [
  'handleAnimalCare',
  'handleToolQuest',
  'handleMachineQuest',
  'handleHungerEvent',
  'startRestTimer',
  'renderProgress',
  'renderAsciiArt',
  'checkChapterCompletion',
  'checkFinalVictory',
]) {
  assert.match(farm, new RegExp(`function\\s+${name}\\s*\\(`), `${name} exists`);
}

for (const word of ['στάβλος', 'κοτέτσι', 'αχυρώνας', 'αποθήκη', 'υπόστεγο', 'πηγάδι', 'λιμνούλα', 'φράχτης']) {
  assert.match(farm, new RegExp(word), `farm contains ${word}`);
}

// Κάθε σελίδα πρέπει να δείχνει (με σωστή σχετική διαδρομή) σε όλες τις άλλες.
// Ο πλήρης έλεγχος συνδέσμων γίνεται στο tests/site-smoke.mjs.
assert.match(farm, /href="\.\.\/index\.html"/, 'farm links back to the encyclopedia');
assert.match(farm, /href="\.\.\/jedi-game\/jedi\.html"/, 'farm links to the jedi nature page');
assert.match(farm, /const MAX_TERMINAL_LINES = \d+;/, 'farm terminal output is capped');

const index = read('index.html');
assert.doesNotMatch(index, /lego-save-name">\$\{save\.name\}/, 'LEGO save name is not injected through innerHTML');
console.log('farm-smoke: ok');
