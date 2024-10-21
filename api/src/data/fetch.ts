import axios from "axios";
import * as fs from "fs/promises";
import * as path from "path";
import { Film, FilmCredits } from "../types/film.types";
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

// Fonction pour récupérer les films
async function fetchFilms(): Promise<Film[]> {
  try {
    const allFilms: Film[] = [];

    for (let page = 1; page <= numberOfPages; page++) {
      const apiUrlWithPage = `${baseApiUrlFilms}&page=${page}`;

      const response = await axios.get(apiUrlWithPage, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });

      const films = response.data.results;

      // Filtrer pour ne garder que les films avec une description
      const filteredFilms: Film[] = films.filter(
        (film: Film) => film.overview && film.overview.trim().length > 0
      );

      allFilms.push(...filteredFilms);
    }

    return allFilms;
  } catch (err) {
    console.error("Erreur lors de la récupération des films :", err);
    return [];
  }
}

// Fonction pour récupérer les crédits des films
async function fetchCredits(films: Film[]): Promise<FilmCredits[]> {
  try {
    const allCredits = await Promise.all(
      films.map(async (film) => {
        const filmId = film.id;
        const apiUrlCredits = `${baseApiUrlCredits}/${filmId}/credits?language=en-US`;

        const response = await axios.get(apiUrlCredits, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });

        const { cast, crew } = response.data;

        // Filtrer pour ne garder que les films avec au moins un acteur
        if (cast.length === 0) {
          return null;
        }
        return { filmId, cast, crew };
      })
    );

    return allCredits.filter((credits) => credits !== null);
  } catch (err) {
    console.error("Erreur lors de la récupération des crédits :", err);
    return [];
  }
}

// Fonction principale
(async () => {
  try {
    // Récupérer les films
    const savedFilms = await fetchFilms();

    // Récupérer les crédits des films récupérés
    const savedCredits = await fetchCredits(savedFilms);

    // Écrire les films et les crédits dans les fichiers JSON
    await fs.writeFile(rawPathFilms, JSON.stringify(savedFilms, null, 2));
    await fs.writeFile(rawPathCredits, JSON.stringify(savedCredits, null, 2));
  } catch (err) {
    console.error("Erreur lors du processus de récupération :", err);
  }
})();
