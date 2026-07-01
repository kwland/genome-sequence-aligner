const presets = {
  toyDeletion: {
    type: "DNA",
    a: "ACCGTATGCTTAGC",
    b: "ACGTTGCTAGC",
    note: "A short DNA example where a gap is expected."
  },
  gapTrap: {
    type: "DNA",
    a: "AAACCCGGGTTTAAACCC",
    b: "AAACCCGGGAAACCC",
    note: "Set the gap penalty to 0 to see how free gaps can make silly alignments."
  },
  proteinToy: {
    type: "Protein",
    a: "MEEPQSDPSVEPPLSQETFSDLWKLLPEN",
    b: "MEEPQSDLSIELPLSQETFSDLWKLLPEN",
    note: "A small protein example. This website version uses simple match/mismatch scoring."
  },
  sarsCov2Spike: {
    type: "RNA",
    a: "AUGUUUGUUUUUCUUGUUUUAUUGCCACUAGUCUCUAGUCAGUGUGUUAAUCUUACAACCAGAAACAAACAC",
    b: "AUGUUUGUUUCUCUUGUUUUAUUGCCACUAGUCUCUAGUCAGUGUAUUAAUCUUACAACCAGAGACAAACAC",
    note: "Simplified SARS-CoV-2 spike-gene segment with a few variant-like base changes."
  },
  sarsVsCovid: {
    type: "RNA",
    a: "AUGUUCACCUUUCUUACAGGUGUUCUUGCUAAUGCUUAUUGUACUAGGUGUAAUACUGCAGGUAACAAUGC",
    b: "AUGUUUGUUUUUCUUGUUGGUGUUCUUGCCAAUGCUUACUGUACUAGGUGUAAUACUACAGGUAACAAUGC",
    note: "Simplified SARS-CoV vs. SARS-CoV-2 comparison for related coronavirus RNA."
  },
  covidVsFlu: {
    type: "RNA",
    a: "AUGUUUGUUUUUCUUGUUUUAUUGCCACUAGUCUCUAGUCAGUGUGUUAAUCUUACAACCAGAAACAAACAC",
    b: "AUGAAGACCAACCUUAGUCUUGUCGGACUGGACUUAACCUUCGACAAAGCUGUUGGAAUCCUGGACAUUGA",
    note: "A lower-similarity viral comparison to show why unrelated viruses do not align as closely."
  },
  bacteriaResistance: {
    type: "DNA",
    a: "ATGAAACGCCTGATTGACGATCTGACCGTAACTGACCTGATCGATGCCGTTACCGATCTGAACTGA",
    b: "ATGAAACGCCTGATTGATGATCTGACCGTAACTGACCTAATCGATGCCGTTACCGTTCTGAACTGA",
    note: "A simplified bacterial gene segment with substitutions that could affect a coded protein."
  },
  custom: {
    type: "DNA",
    a: "",
    b: "",
    note: "Paste your own DNA or protein sequences."
  }
};

const $ = (id) => document.getElementById(id);

function cleanSequence(seq) {
  return seq.replace(/[^A-Za-z*]/g, "").toUpperCase();
}

function formatScore(value) {
  return Number(value).toFixed(1).replace(/\.0$/, "");
}

function align(seqA, seqB, mode, matchScore, mismatchScore, gapScore) {
  const a = cleanSequence(seqA);
  const b = cleanSequence(seqB);
  if (!a || !b) {
    throw new Error("Both sequences need at least one letter.");
  }

  const n = a.length;
  const m = b.length;
  const scores = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const trace = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  if (mode === "global") {
    for (let i = 1; i <= n; i += 1) {
      scores[i][0] = i * gapScore;
      trace[i][0] = 2;
    }
    for (let j = 1; j <= m; j += 1) {
      scores[0][j] = j * gapScore;
      trace[0][j] = 3;
    }
  }

  let bestI = n;
  let bestJ = m;
  let bestScore = mode === "local" ? 0 : scores[n][m];

  for (let i = 1; i <= n; i += 1) {
    for (let j = 1; j <= m; j += 1) {
      const charScore = a[i - 1] === b[j - 1] ? matchScore : mismatchScore;
      const diagonal = scores[i - 1][j - 1] + charScore;
      const up = scores[i - 1][j] + gapScore;
      const left = scores[i][j - 1] + gapScore;

      let best = diagonal;
      let direction = 1;
      if (up > best) {
        best = up;
        direction = 2;
      }
      if (left > best) {
        best = left;
        direction = 3;
      }
      if (mode === "local" && best < 0) {
        best = 0;
        direction = 0;
      }

      scores[i][j] = best;
      trace[i][j] = direction;

      if (mode === "local" && best > bestScore) {
        bestScore = best;
        bestI = i;
        bestJ = j;
      }
    }
  }

  if (mode === "global") {
    bestScore = scores[n][m];
  }

  const alignedA = [];
  const alignedB = [];
  let i = bestI;
  let j = bestJ;

  while (i > 0 || j > 0) {
    const direction = trace[i][j];
    if (mode === "local" && direction === 0) break;
    if (direction === 1) {
      alignedA.push(a[i - 1]);
      alignedB.push(b[j - 1]);
      i -= 1;
      j -= 1;
    } else if (direction === 2) {
      alignedA.push(a[i - 1]);
      alignedB.push("-");
      i -= 1;
    } else if (direction === 3) {
      alignedA.push("-");
      alignedB.push(b[j - 1]);
      j -= 1;
    } else {
      break;
    }
  }

  return {
    alignedA: alignedA.reverse().join(""),
    alignedB: alignedB.reverse().join(""),
    score: bestScore
  };
}

function gapRuns(seq) {
  const runs = seq.match(/-+/g);
  return runs ? runs.map((run) => run.length) : [];
}

function stats(result) {
  const a = result.alignedA;
  const b = result.alignedB;
  let matches = 0;
  let mismatches = 0;
  let gapColumns = 0;

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] === "-" || b[i] === "-") {
      gapColumns += 1;
    } else if (a[i] === b[i]) {
      matches += 1;
    } else {
      mismatches += 1;
    }
  }

  return {
    matches,
    mismatches,
    gapColumns,
    gapRuns: gapRuns(a).concat(gapRuns(b)),
    identity: a.length ? (100 * matches) / a.length : 0
  };
}

function cellClass(a, b) {
  if (a === "-" || b === "-") return "cell-gap";
  return a === b ? "cell-match" : "cell-mismatch";
}

function renderAlignment(result) {
  const width = 70;
  const container = $("alignment");
  container.innerHTML = "";

  for (let start = 0; start < result.alignedA.length; start += width) {
    const chunkA = result.alignedA.slice(start, start + width);
    const chunkB = result.alignedB.slice(start, start + width);
    const block = document.createElement("div");
    block.className = "block";

    const rowA = document.createElement("div");
    const rowMid = document.createElement("div");
    const rowB = document.createElement("div");
    rowA.className = "row";
    rowMid.className = "row mid";
    rowB.className = "row";
    rowA.innerHTML = '<span class="label">A</span>';
    rowMid.innerHTML = '<span class="label"></span>';
    rowB.innerHTML = '<span class="label">B</span>';

    for (let i = 0; i < chunkA.length; i += 1) {
      const charA = document.createElement("span");
      const mid = document.createElement("span");
      const charB = document.createElement("span");
      const cls = cellClass(chunkA[i], chunkB[i]);
      charA.className = `char ${cls}`;
      charB.className = `char ${cls}`;
      mid.className = "char";
      charA.textContent = chunkA[i];
      charB.textContent = chunkB[i];
      mid.textContent = chunkA[i] === chunkB[i] && chunkA[i] !== "-" ? "|" : " ";
      rowA.appendChild(charA);
      rowMid.appendChild(mid);
      rowB.appendChild(charB);
    }

    block.appendChild(rowA);
    block.appendChild(rowMid);
    block.appendChild(rowB);
    container.appendChild(block);
  }
}

function runAlignment() {
  $("message").textContent = "";
  try {
    const result = align(
      $("seqA").value,
      $("seqB").value,
      $("mode").value,
      Number($("match").value),
      Number($("mismatch").value),
      Number($("gap").value)
    );
    const summary = stats(result);
    $("score").textContent = formatScore(result.score);
    $("identity").textContent = `${summary.identity.toFixed(1)}%`;
    $("mismatches").textContent = String(summary.mismatches);
    $("gaps").textContent = `${summary.gapColumns} cols`;
    $("quality").textContent = summary.identity >= 85 ? "Close match" : summary.identity >= 60 ? "Related" : "Distant";
    renderAlignment(result);
  } catch (error) {
    $("message").textContent = error.message;
  }
}

function loadPreset() {
  const item = presets[$("preset").value];
  if ($("preset").value !== "custom") {
    $("seqA").value = item.a;
    $("seqB").value = item.b;
    $("seqType").value = item.type;
  }
  $("presetNote").textContent = item.note;
}

function updateSliderLabels() {
  ["match", "mismatch", "gap"].forEach((id) => {
    $(id).value = Number($(id).value).toFixed(1);
  });
  $("matchOut").textContent = formatScore($("match").value);
  $("mismatchOut").textContent = formatScore($("mismatch").value);
  $("gapOut").textContent = formatScore($("gap").value);
  runAlignment();
}

function setGoodScoring() {
  $("match").value = "2.5";
  $("mismatch").value = "-1.5";
  $("gap").value = "-2.5";
  updateSliderLabels();
  runAlignment();
}

function setBadScoring() {
  $("match").value = "2";
  $("mismatch").value = "-0.5";
  $("gap").value = "0";
  updateSliderLabels();
  runAlignment();
}

["match", "mismatch", "gap"].forEach((id) => {
  $(id).addEventListener("input", updateSliderLabels);
});

$("preset").addEventListener("change", () => {
  loadPreset();
  runAlignment();
});
$("runButton").addEventListener("click", runAlignment);
$("goodButton").addEventListener("click", setGoodScoring);
$("badButton").addEventListener("click", setBadScoring);
$("seqA").addEventListener("input", () => { $("preset").value = "custom"; });
$("seqB").addEventListener("input", () => { $("preset").value = "custom"; });

loadPreset();
updateSliderLabels();
runAlignment();
