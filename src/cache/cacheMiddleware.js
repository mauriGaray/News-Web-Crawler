const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

const cacheMiddleware = (req, res, next) => {
  const url = req.body.url;
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
