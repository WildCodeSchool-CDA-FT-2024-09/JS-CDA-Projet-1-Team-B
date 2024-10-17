import axios from "axios";
import * as fs from "fs/promises";
import * as path from "path";
import { Film } from "../types/film.types";
import "dotenv/config";

// Le token pour l'API
const API_TOKEN = process.env.API_TOKEN;

// L'URL de l'API pour les films et crédits
const baseApiUrlFilms =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&sort_by=popularity.desc&with_genres=53";
const baseApiUrlCredits = "https://api.themoviedb.org/3/movie";

// Nombre de pages à parcourir
const numberOfPages = 5;

// Chemins vers les fichiers de sortie
const rawPathFilms = path.join(__dirname, "raw.json");
const rawPathCredits = path.join(__dirname, "credits.json");

// Fonction pour récupérer les films et les sauvegarder
async function fetchAndSaveFilms() {
  try {
    const allFilms: Film[] = [];

    for (let page = 1; page <= numberOfPages; page++) {
      const apiUrlWithPage = `${baseApiUrlFilms}&page=${page}`;

      const response = await axios.get(apiUrlWithPage, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });

      const films = response.data.results;

      // Filtrer pour ne garder que les films avec isAdult = false
      const filteredFilms: Film[] = films.filter(
        (film: Film) => film.adult === false
      );

      allFilms.push(...filteredFilms);
    }

    // Sauvegarder les films dans raw.json
    await fs.writeFile(rawPathFilms, JSON.stringify(allFilms, null, 2));
  } catch (err) {
    console.error("Erreur lors de la récupération des films :", err);
  }
}

// Fonction pour récupérer les crédits des films
async function fetchAndSaveCredits() {
  try {
    const rawData = await fs.readFile(rawPathFilms, "utf-8");
    const films = JSON.parse(rawData);
    const allCredits = [];

    for (const film of films) {
      const filmId = film.id;
      const apiUrlCredits = `${baseApiUrlCredits}/${filmId}/credits?language=en-US`;

      const response = await axios.get(apiUrlCredits, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });

      const { cast, crew } = response.data;
      allCredits.push({ filmId, cast, crew });
    }

    await fs.writeFile(rawPathCredits, JSON.stringify(allCredits, null, 2));
  } catch (err) {
    console.error("Erreur lors de la récupération des crédits :", err);
  }
}

// Fonction principale
(async () => {
  await fetchAndSaveFilms();
  await fetchAndSaveCredits();
})();
