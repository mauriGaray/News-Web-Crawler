const express = require("express");
const { getNewsSummary } = require("./controllers/summarizeNewsController");
const { cacheMiddleware } = require("./cache/cacheMiddleware");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/work", (req, res) => {
  res.send("Hello World! Esta todo de 10!");
});

app.post("/", cacheMiddleware, getNewsSummary);

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});
