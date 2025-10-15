import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

// Ruta para obtener noticias del archivo del NYT
app.get("/api/news/:year/:month", async (req, res) => {
  const { year, month } = req.params;

  try {
    const response = await fetch(
      `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${process.env.NYT_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Error al obtener datos del NYT");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener noticias" });
  }
});

app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
