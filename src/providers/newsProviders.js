const bbcProvider = require("./bbcProvider");

const providers = {
  "bbc.com": bbcProvider,
  // "TheGuardian.com": guardianProvider,
  // "NYTimes.com": nyTimesProvider,
  // "WashingtonPost.com": washingtonPostProvider,
};

module.exports = providers;
