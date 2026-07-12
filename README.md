# Battleship Tournament AI — GitHub Pages Test Site

This static site matches the official course configuration:

- Board: **8 rows × 12 columns**
- Fleet: **5, 4, 3, 2, 2**
- Shot information: **UNKNOWN / HIT / MISS only**

## Opponents

- **Course Hybrid 20k**: browser mirror of the Python submission. It uses a
  persistent joint fleet posterior with a 20,000-particle ceiling and a
  two-shot lookahead. It ignores exact sunk-ship announcements.
- POMCP
- Bayesian
- Probability
- Random

The playable Course Hybrid uses the full particle ceiling. The 100–200-game
benchmark uses **96 particles** for that row, because running 20,000 particles
for every shot in 100–200 complete games would take much longer. The benchmark
row is labeled accordingly and is intended for regression testing, not as an
exact timing measurement of the full tournament configuration.

## Run locally

```bash
python -m http.server 8765
```

Then open `http://localhost:8765`.

## Deploy to GitHub Pages

Upload `index.html`, `style.css`, `ai.js`, `app.js`, and `layouts.json` to the
root of a GitHub repository. In **Settings → Pages**, publish from the branch
and root folder containing those files.

## Important

The website is a JavaScript test harness. Submit the Python files in the
separate `submission` package to the course tournament, not `ai.js`.
