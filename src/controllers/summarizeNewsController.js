const fetchNewsFromProvider = require("../services/fetchNewsFromProviders");

async function getNews(req, res) {
  const { url } = req.body;
  try {
    const article = await fetchNewsFromProvider(url);
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getNews };
