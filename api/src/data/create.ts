import { CastMember, CrewMember, FilmCredits, Film } from "../types/film.types";
import { AppDataSource } from "../db/data-source";
import { Film as FilmEntity } from "../entities/Film";
import * as fs from "fs/promises";
import * as path from "path";

async function resetDatabase() {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.startTransaction();
  try {
    // Supprimer les anciennes données de la table film
    await queryRunner.query("DELETE FROM film");

    await queryRunner.query('DELETE FROM sqlite_sequence WHERE name = "genre"');

    // Réinitialiser les identifiants auto-incrémentés
    await queryRunner.query('DELETE FROM sqlite_sequence WHERE name = "film"');

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error(
      "Erreur lors de la réinitialisation de la base de données :",
      error
    );
  } finally {
    await queryRunner.release();
  }
}

// Fonction pour insérer un film
async function insertFilm(filmData: Film, filmCredits: FilmCredits) {
  let film = await FilmEntity.findOneBy({ tmdbId: filmData.id });
  if (!film) {
    film = new FilmEntity();
    film.tmdbId = filmData.id;
    film.title = filmData.title;
    film.overview = filmData.overview;
    film.releaseDate = filmData.release_date;
    film.popularity = filmData.popularity;
    film.voteAverage = filmData.vote_average;
    film.voteCount = filmData.vote_count;
    film.posterPath = filmData.poster_path ?? "";
    film.originalLanguage = filmData.original_language;

    // Ajouter le réalisateur
    const directors = filmCredits.crew
      .filter((crewMember: CrewMember) => crewMember.job === "Director")
      .map((director: CrewMember) => director.name);
    film.director = directors[0];

    // Ajouter les acteurs
    const actorNames: string[] = filmCredits.cast.map(
      (actor: CastMember) => actor.name
    );
    film.actors = actorNames.join(", ");

    // Sauvegarder le film avec les genres associés
    await film.save();
  }
}

async function seedDatabase() {
  try {
    // Initialiser la connexion à la base de données
    await AppDataSource.initialize();

    // Réinitialiser la base de données avant d'ajouter de nouvelles données
    await resetDatabase();

    // Lire les fichiers JSON
    const rawData = await fs.readFile(path.join(__dirname, "raw.json"), {
      encoding: "utf-8",
    });
    const creditsData = await fs.readFile(
      path.join(__dirname, "credits.json"),
      { encoding: "utf-8" }
    );

    const films: Film[] = JSON.parse(rawData);
    const credits: FilmCredits[] = JSON.parse(creditsData);

    await Promise.all(
      films.map(async (filmData: Film) => {
        const filmCredits = credits.find(
          (credit: FilmCredits) => credit.filmId === filmData.id
        );
        if (filmCredits) {
          await insertFilm(filmData, filmCredits);
        }
      })
    );
  } catch (err) {
    console.error("Erreur lors du processus de seed :", err);
  } finally {
    await AppDataSource.destroy();
  }
}

seedDatabase();
