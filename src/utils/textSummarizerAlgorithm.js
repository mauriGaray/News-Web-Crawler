const splitSentences = (text) => {
  return text
    .split(".")
    .map((sentence) => sentence.trim())
    .filter(Boolean);
};

const vectorizeSentence = (sentence) => {
  const words = sentence.toLowerCase().split(/\s+/);
  const wordFrequency = {};

  words.forEach((word) => {
    word = word.replace(/[^a-zA-Z]/g, "");
    if (word) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });

  return wordFrequency;
};

const calculateCosineSimilarity = (vec1, vec2) => {
  const intersection = Object.keys(vec1).filter((word) => vec2[word]);
  const dotProduct = intersection.reduce(
    (sum, word) => sum + vec1[word] * vec2[word],
    0
  );
  const magnitude1 = Math.sqrt(
    Object.values(vec1).reduce((sum, val) => sum + val * val, 0)
  );
  const magnitude2 = Math.sqrt(
    Object.values(vec2).reduce((sum, val) => sum + val * val, 0)
  );

  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  return dotProduct / (magnitude1 * magnitude2);
};

const pageRank = (
  graph,
  dampingFactor = 0.85,
  maxIterations = 100,
  tolerance = 0.0001
) => {
  const nodes = Object.keys(graph);
  const numNodes = nodes.length;
  let ranks = {};

  nodes.forEach((node) => {
    ranks[node] = 1 / numNodes;
  });

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let newRanks = {};
    let change = 0;

    nodes.forEach((node) => {
      let rankSum = 0;

      graph[node].forEach((neighbor) => {
        rankSum += ranks[neighbor] / graph[neighbor].length;
      });

      newRanks[node] = (1 - dampingFactor) / numNodes + dampingFactor * rankSum;

      change += Math.abs(newRanks[node] - ranks[node]);
    });

    ranks = { ...newRanks };

    if (change < tolerance) break;
  }

  return ranks;
};

const textRank = (text, numSentences = 3) => {
  const sentences = splitSentences(text);

  const graph = {};
  sentences.forEach((_, i) => {
    graph[i] = [];
  });

  for (let i = 0; i < sentences.length; i++) {
    for (let j = i + 1; j < sentences.length; j++) {
      const vec1 = vectorizeSentence(sentences[i]);
      const vec2 = vectorizeSentence(sentences[j]);
      const similarity = calculateCosineSimilarity(vec1, vec2);

      if (similarity > 0.1) {
        graph[i].push(j);
        graph[j].push(i);
      }
    }
  }

  const ranks = pageRank(graph);

  const sortedSentences = Object.keys(ranks)
    .map((i) => ({ sentence: sentences[i], rank: ranks[i] }))
    .sort((a, b) => b.rank - a.rank);

  const summary =
    sortedSentences
      .slice(0, numSentences)
      .map((s) => s.sentence)
      .join(". ") + ".";

  return summary;
};

module.exports = textRank;
