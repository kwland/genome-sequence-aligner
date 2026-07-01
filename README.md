# Sequence Aligner Project

Build and tune a small DNA/protein sequence alignment app for the CMU Pre-College Computational Biology Module 2 project.

The easiest version to use on GitHub is the website:

- `index.html`
- `styles.css`
- `app.js`

The Colab notebook version is also included:

- `Sequence_Aligner_Project.ipynb`

It implements global and local alignment with dynamic programming, lets you tune match, mismatch, and gap scores, supports DNA and protein sequences, and includes a SARS-CoV vs. SARS-CoV-2 spike comparison.

## Use The Website

Open `index.html` in a browser.

If this repository is published with GitHub Pages, the app will run directly from the repository website.

On Windows, you can also double-click `open_in_edge.bat` to open the website in Microsoft Edge.

## Turn On GitHub Pages

1. Open your repository on GitHub.
2. Click `Settings`.
3. Click `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Choose branch `main` and folder `/root`.
6. Click `Save`.
7. Wait a minute, then open the Pages link GitHub gives you.

## What Is Included

- Browser website app with no install needed
- A guided notebook layout with quick-start instructions
- Preset sequences for first-time testing
- A button-based alignment app so the output does not constantly refresh while editing
- Global alignment
- Local alignment
- Tunable match reward, mismatch penalty, and gap penalty
- DNA mode with simple match/mismatch scoring
- Protein mode with simple scoring or substitution matrices such as BLOSUM62 and PAM250
- Alignment score, percent identity, mismatch count, and gap summaries
- Colored alignment display
- Good-vs-bad parameter examples
- NCBI fetch helpers for real sequence examples
- Write-up sections embedded in the notebook

## Run In Google Colab

1. Upload `Sequence_Aligner_Project.ipynb` to Google Drive.
2. Open it with Google Colab.
3. Run the cells from top to bottom.
4. If Colab asks for permission to install Biopython, allow it.
5. Use the interactive app cell to test your own sequences and scoring parameters.

## How To Use The App

1. Choose a preset from the dropdown or paste your own sequences.
2. Pick global or local alignment.
3. Choose DNA or protein mode.
4. For protein alignments, choose `Simple`, `BLOSUM62`, or `PAM250`.
5. Move the scoring sliders.
6. Click `Run alignment`.
7. Use the colored alignment and statistics to explain whether the result makes biological sense.

Color key:

- Green columns are matches.
- Red columns are mismatches.
- Blue columns contain gaps.

## Demo Path

For a short class demo:

1. Open the interactive app.
2. Run the `Toy DNA: one deletion` preset with sensible parameters.
3. Switch to the `Toy DNA: scattered-gap trap` preset and set the gap penalty to `0`.
4. Explain why the technically optimal result can be biologically silly.
5. Show the SARS-CoV vs. SARS-CoV-2 DNA and protein comparison.
6. Explain why synonymous DNA mutations can disappear in the protein alignment.

## Run Locally

Install the dependencies:

```bash
pip install -r requirements.txt
```

Then start Jupyter:

```bash
jupyter notebook
```

Open `Sequence_Aligner_Project.ipynb`.

## Project Argument

The notebook is designed to support the main biological argument:

An alignment score is not an absolute measure of truth. The score depends on the scoring system, so alignment quality should also be judged by biological evidence: percent identity, plausible gap placement, conserved motifs/domains, synonymous vs. nonsynonymous changes, and agreement with known evolutionary relationships.

## Suggested GitHub Repository Description

Interactive DNA/protein sequence aligner for exploring how scoring parameters change global and local alignments.
