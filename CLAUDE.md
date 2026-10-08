# Napoleon — Claude Context

## Project
Interactive programming projects and educational games for Napoleon (6 years old).
HTML + CSS + JS (browser) + Python (terminal). Public GitHub Pages site.

## Live Site
https://konzag.github.io/napoleon/

## Structure
- `index.html` + `assets/styles.css`: encyclopedia (animals / plants / dinosaurs, quiz, LEGO builder)
- `assets/storage.js`: `NapoleonStorage.readJson/writeJson` — the ONLY way pages touch localStorage (try/catch wrapped)
- `diablo-game/diablo.html`, `school-game/school.html`, `farm-game/farm.html`,
  `anatomy-game/anatomy.html` (+ `css/`, `js/`), `jedi-game/jedi.html`: one folder per web game
- `jedi-game/jedi.py`, `diablo-game/diablo.py`: Python terminal games (Windows `winsound`, optional)
- `common/terminal.py`: shared Python helpers (`slow_print`, `beep`, `print_divider`, `run_game`, ...)
- `tests/*.mjs`: Node smoke tests (no dependencies); `site-smoke.mjs` checks every local link and
  that every game page links to every other page
- `.github/workflows/test.yml`: runs `node tests/*.mjs` + `py_compile` on push/PR
- No backend, no database, no deploy pipeline (GitHub Pages serves `main`)

## Adding a new game page
- Put it in its own `<name>-game/` folder and add it to the top nav of EVERY page
  and to the `pages` list in `tests/site-smoke.mjs`
- Load `../assets/storage.js` before any script that saves progress

## Rules
- No auto-deploy needed (GitHub Pages serves static files automatically)
- All content in Greek
- Code must have extensive comments so Napoleon can read it someday
- Keep age-appropriate: 6 years old, Star Wars fan, loves animals and dinosaurs
- Never add server-side code or dependencies requiring installation
- Never put user-typed text into `innerHTML` — use `textContent`
