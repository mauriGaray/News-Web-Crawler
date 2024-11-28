// Función para dividir el texto en oraciones
const splitSentences = (text) => {
  return text
    .split(".")
    .map((sentence) => sentence.trim())
    .filter(Boolean);
};

// Función para convertir una oración en un vector de frecuencia de palabras
const vectorizeSentence = (sentence) => {
  const words = sentence.toLowerCase().split(/\s+/);
  const wordFrequency = {};

  words.forEach((word) => {
    word = word.replace(/[^a-zA-Z]/g, ""); // Eliminar caracteres no alfabéticos
    if (word) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });

  return wordFrequency;
};

// Función para calcular la similitud de coseno entre dos oraciones
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

  if (magnitude1 === 0 || magnitude2 === 0) return 0; // Evitar división por cero
  return dotProduct / (magnitude1 * magnitude2);
};

// Función para aplicar el algoritmo de PageRank
const pageRank = (
  graph,
  dampingFactor = 0.85,
  maxIterations = 100,
  tolerance = 0.0001
) => {
  const nodes = Object.keys(graph);
  const numNodes = nodes.length;
  let ranks = {};

  // Inicializar rangos
  nodes.forEach((node) => {
    ranks[node] = 1 / numNodes; // Asignar un puntaje inicial igual para todos
  });

  // Iteraciones del algoritmo PageRank
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let newRanks = {};
    let change = 0;

    nodes.forEach((node) => {
      let rankSum = 0;
      // Sumar las contribuciones de los nodos vecinos
      graph[node].forEach((neighbor) => {
        rankSum += ranks[neighbor] / graph[neighbor].length;
      });

      // Calcular el nuevo rango
      newRanks[node] = (1 - dampingFactor) / numNodes + dampingFactor * rankSum;

      // Medir el cambio
      change += Math.abs(newRanks[node] - ranks[node]);
    });

    // Actualizar los rangos
    ranks = { ...newRanks };

    // Si el cambio es muy pequeño, terminamos
    if (change < tolerance) break;
  }

  return ranks;
};

// Función principal de TextRank
const textRank = (text, numSentences = 3) => {
  const sentences = splitSentences(text);

  // Crear un gráfico de similitudes
  const graph = {};
  sentences.forEach((_, i) => {
    graph[i] = [];
  });

  // Calcular similitudes entre todas las oraciones y agregar conexiones al gráfico
  for (let i = 0; i < sentences.length; i++) {
    for (let j = i + 1; j < sentences.length; j++) {
      const vec1 = vectorizeSentence(sentences[i]);
      const vec2 = vectorizeSentence(sentences[j]);
      const similarity = calculateCosineSimilarity(vec1, vec2);

      if (similarity > 0.1) {
        // Umbral de similitud para conectar oraciones
        graph[i].push(j);
        graph[j].push(i);
      }
    }
  }

  // Aplicar el algoritmo PageRank al gráfico
  const ranks = pageRank(graph);

  // Ordenar las oraciones por su puntaje de PageRank
  const sortedSentences = Object.keys(ranks)
    .map((i) => ({ sentence: sentences[i], rank: ranks[i] }))
    .sort((a, b) => b.rank - a.rank);

  // Seleccionar las oraciones con los puntajes más altos
  const summary =
    sortedSentences
      .slice(0, numSentences)
      .map((s) => s.sentence)
      .join(". ") + ".";

  return summary;
};

module.exports = textRank;
