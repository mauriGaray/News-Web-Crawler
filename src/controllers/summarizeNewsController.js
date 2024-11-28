const fetchNewsFromProvider = require("../services/fetchNewsFromProviders");
const { saveToCache } = require("../cache/cacheMiddleware");
const textRank = require("../utils/textSummarizerAlgorithm");

async function getNewsSummary(req, res) {
  const param = Object.keys(req.query)[0];
  const url = req.query[param];
  try {
    const article = await fetchNewsFromProvider(url);

    const summary = textRank(article.content);
    saveToCache(url, { title: article.title, summary: summary });

    res.status(200).json({ title: article.title, summary: summary });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getNewsSummary };
