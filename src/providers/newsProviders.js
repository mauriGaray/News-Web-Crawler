const bbcProvider = require("./bbcProvider");

const providers = {
  "www.bbc.com": bbcProvider,
  // "The Guardian": guardianProvider,
  // "CNN": cnnProvider,
  // "Fox News": foxProvider,
  // "The New York Times": nyTimesProvider
};

module.exports = providers;
