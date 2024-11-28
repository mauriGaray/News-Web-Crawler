const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

const cacheMiddleware = (req, res, next) => {
  const param = Object.keys(req.query)[0];

  const url = req.query[param];

  if (!url) {
    return res
      .status(400)
      .json({ error: "El ingreso de una URL es obligatorio" });
  }

  const cachedData = cache.get(url);

  if (cachedData) {
    return res.json(cachedData);
  }
  res.locals.cacheKey = url;
  next();
};

const saveToCache = (url, data) => {
  cache.set(url, data);
};

module.exports = { cacheMiddleware, saveToCache };
