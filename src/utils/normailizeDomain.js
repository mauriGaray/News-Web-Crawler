function normalizeDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch (error) {
    return error;
  }
}
module.exports = normalizeDomain;
