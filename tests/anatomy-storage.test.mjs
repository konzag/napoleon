// anatomy-storage.test.mjs — the anatomy game keeps what the child found in two localStorage keys:
//   napoleon_anatomy_collected  = the collected cards (array of ids)
//   napoleon_anatomy_progress   = everything else of the game state (object, WITHOUT `collected`)
// The page runs in the fake browser of helpers/fake-dom.mjs with one fake localStorage shared by both loads.
// Run: node --test tests/anatomy-storage.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { loadPage, memoryStorage } from './helpers/fake-dom.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const COLLECTED = 'napoleon_anatomy_collected';
const PROGRESS = 'napoleon_anatomy_progress';

const open = (storage) => {
  const page = loadPage(root, 'anatomy-game/anatomy.html', { localStorage: storage });
  // `state` and ALL_COLLECTABLES are top-level let/const of anatomy.js: read them inside the page's context.
  page.get = (expr) => JSON.parse(JSON.stringify(vm.runInContext(expr, page.window)));
  return page;
};
const earnedCards = (page) =>
  page.document.getElementById('collectionsGrid').children.filter((c) => c.classList.contains('earned')).length;

test('anatomy progress round-trip; wrong shapes are ignored', () => {
  // --- 1. Collect the first organ and discover it in a first visit; the game writes both keys. ---
  const storage = memoryStorage();
  const first = open(storage);
  const firstOrgan = first.get('ALL_COLLECTABLES[0].id');
  assert.equal(firstOrgan, 'organ_brain');
  vm.runInContext(`state.discoveredOrgans.push('brain'); state.habitsChecked.push('Νερό'); collectItem(${JSON.stringify(firstOrgan)});`, first.window);

  assert.deepEqual(JSON.parse(storage.getItem(COLLECTED)), [firstOrgan], 'collected key');
  const progress = JSON.parse(storage.getItem(PROGRESS));
  assert.equal(typeof progress, 'object');
  assert.equal(Array.isArray(progress), false);
  assert.equal('collected' in progress, false, '`collected` is NOT duplicated inside the progress key');
  assert.deepEqual(progress.discoveredOrgans, ['brain']);
  assert.deepEqual(progress.habitsChecked, ['Νερό']);
  const savedState = first.get('state');

  // --- 2. Reload: the same state comes back and the card shows as earned. ---
  const second = open(storage);
  assert.deepEqual(second.get('state'), savedState, 'same state after reload');
  assert.equal(earnedCards(second), 1, 'the collected card is shown as earned');

  // --- 3. Wrong shapes (collected = {}, progress = []): defaults, no throw. ---
  const broken = memoryStorage();
  broken.setItem(COLLECTED, '{}');
  broken.setItem(PROGRESS, '[]');
  const fresh = open(memoryStorage()).get('state');
  const third = open(broken);
  assert.deepEqual(third.get('state'), fresh, 'defaults');
  assert.equal(earnedCards(third), 0);

  // A non-empty array or a string in the progress key must not leak "0", "1", ... into the state either.
  for (const bad of ['["brain"]', '"brain"']) {
    const s = memoryStorage();
    s.setItem(PROGRESS, bad);
    assert.deepEqual(open(s).get('state'), fresh, `progress ${bad} -> defaults`);
  }

  // Corrupt JSON in both keys: defaults as well.
  const corrupt = memoryStorage();
  corrupt.setItem(COLLECTED, '[oops');
  corrupt.setItem(PROGRESS, '{oops');
  assert.deepEqual(open(corrupt).get('state'), fresh, 'corrupt JSON -> defaults');
});
