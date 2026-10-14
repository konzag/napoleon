# Napoleon — Claude Context

## Project
Interactive programming projects and educational games for Napoleon (6 years old).
HTML + CSS + JS (browser) + Python (terminal). Served by the family games hub «Τα Παιχνίδια μας» (konzag/games-hub)
at `/napoleon/`; GitHub Pages is closed (2026-10-14).

## Live Site
https://public.tailc01d70.ts.net/napoleon/ (games-hub over Tailscale Funnel; the hub pins a commit of this repo)

## Standard
This repo follows **GAME-STANDARD v1 §9** (the old games get the shell only; they are not rewritten):
https://github.com/konzag/games-template/blob/main/GAME-STANDARD.md (copy: konzag/games-hub `docs/GAME-STANDARD.md`).
- `assets/hub-shell.js` is the hub shell (🏠 back to `/`, 🔊 sound on/off, its own key `game.<repo>.sound`).
  Load it FIRST on every HTML page (`tests/hub-shell.test.mjs` checks it).
- No external resources (no Google Fonts, no CDN). The font comes from the hub: `/static/fonts/comfortaa.css`.
- The hub serves every page with a strict CSP: inline `onclick="…"` still works here (the hub hashes it), but new
  code uses `addEventListener`. No `eval`, no network calls.

## Structure
- `index.html` + `assets/styles.css`: encyclopedia (animals / plants / dinosaurs, quiz, LEGO builder)
- `assets/storage.js`: `NapoleonStorage.readJson/writeJson` — the ONLY way pages touch localStorage (try/catch wrapped; `assets/hub-shell.js` keeps only its own sound key)
- `diablo-game/diablo.html`, `school-game/school.html`, `farm-game/farm.html`,
  `anatomy-game/anatomy.html` (+ `css/`, `js/`), `jedi-game/jedi.html`: one folder per web game
- `jedi-game/jedi.py`, `diablo-game/diablo.py`: Python terminal games (Windows `winsound`, optional)
- `common/terminal.py`: shared Python helpers (`slow_print`, `beep`, `print_divider`, `run_game`, ...)
- `tests/*.mjs`: Node smoke tests (no dependencies); `site-smoke.mjs` checks every local link and
  that every game page links to every other page
- `.github/workflows/test.yml`: runs `node tests/*.mjs` + `py_compile` on push/PR
- No backend, no database; games-hub serves a pinned commit (no deploy pipeline here)

## Adding a new game page
- Put it in its own `<name>-game/` folder and add it to the top nav of EVERY page
  and to the `pages` list in `tests/site-smoke.mjs`
- Load `../assets/storage.js` before any script that saves progress

## Rules
- Flow: feature branch → PR to `staging` → release PR `staging → main` (owner GO); the hub then bumps its submodule
- All content in Greek
- Code must have extensive comments so Napoleon can read it someday
- Keep age-appropriate: 6 years old, Star Wars fan, loves animals and dinosaurs
- Never add server-side code or dependencies requiring installation
- Never put user-typed text into `innerHTML` — use `textContent`
