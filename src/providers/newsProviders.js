const bbcProvider = require("./bbcProvider");

const providers = {
  "bbc.com": bbcProvider,
  // "The Guardian": guardianProvider,
  // "CNN": cnnProvider,
  // "Fox News": foxProvider,
  // "The New York Times": nyTimesProvider
};

module.exports = providers;
