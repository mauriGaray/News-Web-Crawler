const providers = require("../providers/newsProviders");
const normalizeDomain = require("../utils/normailizeDomain");
async function fetchNewsFromProviders(url) {
  try {
    const domain = normalizeDomain(url);
    if (!providers[domain]) {
      throw new Error(` ${domain} todavía no esta soportado.`);
    }
    return await providers[domain](url);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = fetchNewsFromProviders;
