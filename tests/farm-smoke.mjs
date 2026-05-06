import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (name) => fs.readFileSync(new URL(name, root), 'utf8');

const farm = read('farm.html');

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

for (const file of ['index.html', 'diablo.html', 'school.html', 'farm.html']) {
  const html = read(file);
  for (const target of ['index.html', 'diablo.html', 'school.html', 'farm.html']) {
    assert.match(html, new RegExp(`href="${target}"`), `${file} links to ${target}`);
  }
}

const index = read('index.html');
assert.doesNotMatch(index, /lego-save-name">\$\{save\.name\}/, 'LEGO save name is not injected through innerHTML');
