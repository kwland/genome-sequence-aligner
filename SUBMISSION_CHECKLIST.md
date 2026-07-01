# Submission Checklist

Before submitting:

- Run the notebook from top to bottom in Google Colab.
- Take screenshots of one good alignment and one bad alignment.
- Replace the placeholder interpretation paragraphs with your own words.
- Run the SARS-CoV vs. SARS-CoV-2 DNA and protein comparison.
- Explain where DNA and protein alignments disagree and why synonymous mutations matter.
- Answer the central question: how can alignment quality be judged when the score depends on parameters?
- Turn on sharing for your Colab notebook or GitHub repository.

## Put This On GitHub

If you are using the GitHub website:

1. Create a new repository on GitHub.
2. Upload these files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `open_in_edge.bat`
   - `OPEN_WEBSITE.md`
   - `Sequence_Aligner_Project.ipynb`
   - `README.md`
   - `requirements.txt`
   - `.gitignore`
   - `SUBMISSION_CHECKLIST.md`
3. Commit the files.
4. Copy the repository link.

If you are using Git on your computer:

```bash
git init
git add Sequence_Aligner_Project.ipynb README.md requirements.txt .gitignore SUBMISSION_CHECKLIST.md
git commit -m "Add sequence aligner project notebook"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPO_URL` with the URL GitHub gives you.
