# napoleon

## What is this
A Star Wars + nature encyclopedia app built for Napoleon (age 6), his first coding project.
Two standalone programs with heavy comments so Napoleon can read the code someday.

## Files
- `index.html` — Interactive browser encyclopedia (animals, plants, dinosaurs, quiz, LEGO builder, Star Wars theme)
- `napoleon.py` — Terminal Jedi Nature Explorer (animals, plants, music notes, Star Wars ASCII)

## Stack
- HTML + CSS + JavaScript (vanilla, no frameworks, no build step)
- Python 3 (colorama optional, winsound built-in Windows)

## How to run
```bash
# Browser app — just double-click index.html
# Terminal app
python napoleon.py
```

## Key facts
- Target user: Napoleon, age 6
- Language: Greek UI throughout
- No backend, no database, no deployment
- Repo: konzag/napoleon (GitHub Pages: konzag.github.io/napoleon)
- `.claude/` folder exists at repo root with Claude Code settings

## Notes for Claude Code
- Keep all UI text in Greek
- Star Wars + nature theme must be preserved
- Code must be heavily commented (Napoleon may read it someday)
- Audio via Web Audio API only — no external files
- LEGO builder grid is 10×8 with 8 colors + eraser
- Quiz has 8 questions with Jedi ranking at the end
