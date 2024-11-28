const fetchNewsFromProvider = require("../services/fetchNewsFromProviders");

const textRank = require("../utils/textSummarizerAlgorithm");

async function getNewsSummary(req, res) {
  const { url } = req.body;
  try {
    const article = await fetchNewsFromProvider(url);

    const summary = textRank(article.content);
    res.status(200).json(summary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getNewsSummary };
