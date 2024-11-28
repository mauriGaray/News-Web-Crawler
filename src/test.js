const fetchNewsFromProvider = require("./services/fetchNewsFromProviders");

(async () => {
  const url = "https://www.bbc.com/news/articles/c5ygn5579gvo"; // URL de ejemplo
  try {
    const news = await fetchNewsFromProvider(url);
    console.log("Título:", news.title);
    console.log("Contenido:", news.content);
  } catch (error) {
    console.error(error.message);
  }
})();
