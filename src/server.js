const express = require("express");
const { getNewsSummary } = require("./controllers/summarizeNewsController");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! All is doing great!");
});

app.post("/summarizeNews", getNewsSummary);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
