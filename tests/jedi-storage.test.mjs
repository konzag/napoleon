// jedi-storage.test.mjs — the Jedi nature page remembers which animals and plants the child has learned
// (localStorage key `napoleon_jedi_learned`, an array of ids). Fake browser: helpers/fake-dom.mjs,
// one fake localStorage shared by both page loads. Run: node --test tests/jedi-storage.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { loadPage, memoryStorage } from './helpers/fake-dom.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KEY = 'napoleon_jedi_learned';

const open = (storage) => {
  const page = loadPage(root, 'jedi-game/jedi.html', { localStorage: storage });
  // `learned` (a Set) is a top-level `let` of the page script: read it inside the page's context.
  page.learned = () => vm.runInContext('[...learned]', page.window);
  page.badge = () => page.document.getElementById('progressBadge').textContent;
  page.learnedCards = () =>
    ['animalsGrid', 'plantsGrid']
      .flatMap((id) => page.document.getElementById(id).children)
      .filter((c) => c.classList.contains('learned')).length;
  return page;
};

test('learned list survives reload; corrupt value -> empty list', () => {
  const storage = memoryStorage();
  const first = open(storage);
  assert.deepEqual([...first.learned()], []);
  assert.equal(first.badge(), 'Έμαθα 0/20 πλάσματα! 🌟');

  // Learn the lion and the cactus (what the «Το έμαθα!» button does: add + saveLearned()).
  vm.runInContext("learned.add('lion'); saveLearned(); learned.add('cactus'); saveLearned();", first.window);
  assert.deepEqual(JSON.parse(storage.getItem(KEY)), ['lion', 'cactus']);
  assert.equal(first.badge(), 'Έμαθα 2/20 πλάσματα! 🌟');

  // Reload: both still learned, the badge and the two cards show it.
  const second = open(storage);
  assert.deepEqual([...second.learned()], ['lion', 'cactus']);
  assert.equal(second.badge(), 'Έμαθα 2/20 πλάσματα! 🌟');
  assert.equal(second.learnedCards(), 2);

  // Corrupt JSON or a wrong shape: an empty list, the page still opens.
  for (const bad of ['[lion', '{"lion":true}', '"lion"', '42']) {
    const s = memoryStorage();
    s.setItem(KEY, bad);
    const page = open(s);
    assert.deepEqual([...page.learned()], [], `${bad} -> empty list`);
    assert.equal(page.badge(), 'Έμαθα 0/20 πλάσματα! 🌟');
  }
});
