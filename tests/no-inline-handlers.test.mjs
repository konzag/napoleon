// no-inline-handlers.test.mjs — CSP guard + the main buttons still work.
// Run: node tests/no-inline-handlers.test.mjs   (CI runs every tests/*.mjs)
//   1. No served file has an inline event handler (onclick="…", onmouseover="…" etc.):
//      the games hub can drop 'unsafe-hashes' from its CSP.
//   2. Each page runs in a fake browser and each main button calls its game function.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPage, spyOn, servedFiles, findInlineHandlers } from './helpers/fake-dom.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('no inline event-handler attributes in served files', () => {
  const files = servedFiles(root);
  for (const page of ['index.html', 'diablo-game/diablo.html', 'school-game/school.html', 'anatomy-game/js/anatomy.js']) {
    assert.ok(files.includes(page), `${page} is checked`);
  }
  assert.deepEqual(findInlineHandlers(root), []);
});

// [page, button id, game function, expected arguments]
const BUTTONS = [
  ['index.html', 'sound-btn', 'toggleSound', []],
  ['index.html', 'quiz-restart-btn', 'startQuiz', []],
  ['index.html', 'lego-toggle-btn', 'toggleLegoBuilder', []],
  ['index.html', 'lego-clear-btn', 'clearLegoGrid', []],
  ['index.html', 'lego-save-btn', 'toggleLegoSaveInput', []],
  ['index.html', 'lego-load-btn', 'toggleLegoLoadPanel', []],
  ['index.html', 'lego-confirm-save-btn', 'confirmLegoSave', []],
  ['diablo-game/diablo.html', 'sound-toggle', 'toggleSound', []],
  ['diablo-game/diablo.html', 'start-btn', 'startGame', []],
  ['diablo-game/diablo.html', 'quit-btn', 'confirmQuit', []],
];

test('main buttons call the game functions', () => {
  for (const [page, id, fn, args] of BUTTONS) {
    const p = loadPage(root, page);
    const calls = spyOn(p.window, fn);
    p.document.getElementById(id).click();
    assert.deepEqual(calls, [args], `${page}: #${id} -> ${fn}()`);
  }
});

test('encyclopedia tabs pass their section', () => {
  const p = loadPage(root, 'index.html');
  const calls = spyOn(p.window, 'showTab');
  for (const t of p.document.querySelectorAll('.tab-btn')) t.click();
  assert.deepEqual(calls, [['animals'], ['plants'], ['dinos'], ['quiz']]);
});

test('encyclopedia tab really switches the grid', () => {
  const { document: d } = loadPage(root, 'index.html');
  d.querySelector('.tab-btn.plants').click();
  assert.ok(!d.getElementById('plants-grid').classList.contains('hidden'));
  assert.ok(d.getElementById('animals-grid').classList.contains('hidden'));
  assert.ok(d.querySelector('.tab-btn.plants').classList.contains('active'));
});

test('academy link lights up under the mouse and back', () => {
  const { document: d } = loadPage(root, 'index.html');
  const link = d.getElementById('academy-link');
  link.dispatch('mouseover');
  assert.equal(link.style.background, '#ffe81f');
  assert.equal(link.style.color, '#000');
  link.dispatch('mouseout');
  assert.equal(link.style.background, '');
  assert.equal(link.style.color, '#ffe81f');
});

test('diablo: title start button starts audio and opens the character select', () => {
  const p = loadPage(root, 'diablo-game/diablo.html');
  const audio = spyOn(p.window, 'initAudio');
  const screens = spyOn(p.window, 'showScreen');
  p.document.getElementById('title-start-btn').click();
  assert.deepEqual(audio, [[]]);
  assert.deepEqual(screens, [['charselect']]);
});

test('diablo: back / play-again buttons open their screen', () => {
  const p = loadPage(root, 'diablo-game/diablo.html');
  const screens = spyOn(p.window, 'showScreen');
  for (const b of p.document.querySelectorAll('button[data-screen]')) b.click();
  assert.deepEqual(screens, [['title'], ['charselect'], ['title'], ['charselect'], ['title']]);
});

test('diablo: showScreen really switches screens', () => {
  const { document: d } = loadPage(root, 'diablo-game/diablo.html');
  d.getElementById('title-start-btn').click();
  assert.ok(!d.getElementById('screen-charselect').classList.contains('hidden'));
  assert.ok(d.getElementById('screen-title').classList.contains('hidden'));
});

test('school: grade buttons pass their grade and show it', () => {
  const p = loadPage(root, 'school-game/school.html');
  const btns = p.document.querySelectorAll('.grade-tab-btn');
  btns[2].click();
  assert.ok(p.document.getElementById('grade-c').classList.contains('active'));
  assert.ok(btns[2].classList.contains('active') && !btns[0].classList.contains('active'));
  const calls = spyOn(p.window, 'showGrade');
  for (const b of btns) b.click();
  assert.deepEqual(calls, [['a'], ['b'], ['c'], ['d'], ['e'], ['st']]);
});
