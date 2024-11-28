const providers = require("../providers/newsProviders");

async function fetchNewsFromProviders(url) {
  const domain = new URL(url).hostname;
  if (!providers[domain]) {
    throw new Error(` ${domain} todavía no esta soportado.`);
  }
  return await providers[domain](url);
}

module.exports = fetchNewsFromProviders;
