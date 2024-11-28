const axios = require("axios");
const cheerio = require("cheerio");

async function bbcProvider(url) {
  try {
    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const title = $("h1").text().trim();

    const paragraphs = $(".sc-eb7bd5f6-0")
      .map((i, el) => $(el).text().trim())
      .get();
    const content = paragraphs.join(" ");

    return { title, content };
  } catch (error) {
    console.error(
      `Error al intentar traer el articulo de la BBC: ${error.message}`
    );
    throw new Error("Error al intentar traer el articulo de la BBC");
  }
}

module.exports = bbcProvider;
