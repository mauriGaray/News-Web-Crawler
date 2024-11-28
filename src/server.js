const express = require("express");
const { getNews } = require("./controllers/summarizeNewsController");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/summarizeNews", getNews);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
