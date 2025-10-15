const loadBtn = document.getElementById("load");
const container = document.getElementById("news-container");

loadBtn.addEventListener("click", async () => {
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;

  container.innerHTML = "<p>Cargando noticias...</p>";

  try {
    const res = await fetch(`http://localhost:4000/api/news/${year}/${month}`);
    const data = await res.json();

    const articles = data.response.docs.slice(0, 20); // mostrar las primeras 20
    container.innerHTML = articles
      .map(
        (a) => `
        <div class="card">
          <h3>${a.headline.main}</h3>
          <p>${a.snippet || "Sin descripción"}</p>
          <a href="${a.web_url}" target="_blank">Leer más</a>
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Error al cargar noticias.</p>";
  }
});