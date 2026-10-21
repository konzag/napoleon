// storage-keys.test.mjs — the names of the "drawers" (localStorage keys) where the games keep the child's saves.
// If a key is renamed, every LEGO build, every collected organ and every learned animal is silently lost after the
// update, so the names are frozen here. Run: node --test tests/storage-keys.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { servedFiles } from './helpers/fake-dom.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const files = servedFiles(root);

const GAME_KEYS = ['napoleon_anatomy_collected', 'napoleon_anatomy_progress', 'napoleon_jedi_learned', 'napoleon_lego_saves'];
const SHELL_KEY = 'game.napoleon.sound';

test('storage keys are frozen', () => {
  // 1. Exactly the four game keys appear in the served files (no new, no renamed key).
  const found = new Set();
  for (const f of files) for (const m of read(f).matchAll(/['"`](napoleon_[\w]+)['"`]/g)) found.add(m[1]);
  assert.deepEqual([...found].sort(), GAME_KEYS, 'game storage keys');

  // 2. Each key belongs to the page that owns it.
  assert.match(read('index.html'), /LEGO_STORAGE_KEY\s*=\s*'napoleon_lego_saves'/);
  assert.match(read('anatomy-game/js/anatomy.js'), /STORAGE_KEY_COLLECTED\s*=\s*'napoleon_anatomy_collected'/);
  assert.match(read('anatomy-game/js/anatomy.js'), /STORAGE_KEY_PROGRESS\s*=\s*'napoleon_anatomy_progress'/);
  assert.match(read('jedi-game/jedi.html'), /STORAGE_KEY\s*=\s*'napoleon_jedi_learned'/);

  // 3. Only storage.js and hub-shell.js touch localStorage directly (everything else goes through NapoleonStorage).
  const direct = files.filter((f) => /\blocalStorage\s*\.\s*(getItem|setItem|removeItem|clear)\b/.test(read(f)));
  assert.deepEqual(direct.sort(), ['assets/hub-shell.js', 'assets/storage.js']);

  // 4. hub-shell keeps the sound switch under game.<data-game>.sound, and every page says data-game="napoleon".
  assert.match(read('assets/hub-shell.js'), /'game\.'\s*\+\s*game\s*\+\s*'\.sound'/);
  const pages = files.filter((f) => f.endsWith('.html'));
  assert.ok(pages.length >= 6, 'all pages found');
  for (const page of pages) {
    const games = [...read(page).matchAll(/data-game="([^"]*)"/g)].map((m) => m[1]);
    assert.deepEqual(games, ['napoleon'], `${page}: data-game -> ${SHELL_KEY}`);
  }
});
