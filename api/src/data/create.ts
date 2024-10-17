import { CastMember, CrewMember, FilmCredits, Film } from "../types/film.types";
import { AppDataSource } from "../db/data-source";
import { Film as FilmEntity } from "../entities/Film";
import * as fs from "fs/promises";
import * as path from "path";
import { Repository } from "typeorm";

(async () => {
  try {
    await AppDataSource.initialize();

    const filmRepo = AppDataSource.getRepository(FilmEntity);

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

    // Boucle pour insérer chaque film dans la base de données
    for (const filmData of films) {
      const filmCredits = credits.find(
        (credit: FilmCredits) => credit.filmId === filmData.id
      );
      if (filmCredits) {
        await insertFilm(filmData, filmCredits, filmRepo);
      }
    }
  } catch (err) {
    console.error("Erreur lors de l'insertion dans la base de données :", err);
  } finally {
    await AppDataSource.destroy();
  }
})();

// Fonction pour insérer un film
async function insertFilm(
  filmData: Film,
  filmCredits: FilmCredits,
  filmRepo: Repository<FilmEntity>
) {
  let film = await filmRepo.findOneBy({ id: filmData.id });
  if (!film) {
    film = new FilmEntity();
    film.id = filmData.id;
    film.title = filmData.title;
    film.overview = filmData.overview;
    film.releaseDate = filmData.release_date;
    film.popularity = filmData.popularity;
    film.voteAverage = 0;
    film.voteCount = 0;
    film.posterPath = filmData.poster_path ?? "";
    film.originalLanguage = filmData.original_language;

    // Ajouter les réalisateurs
    const directors = filmCredits.crew
      .filter((crewMember: CrewMember) => crewMember.job === "Director")
      .map((director: CrewMember) => director.name);
    film.director = directors.join(", ");

    // Ajouter les acteurs
    const actorNames: string[] = filmCredits.cast.map(
      (actor: CastMember) => actor.name
    );
    film.actors = actorNames.join(", ");

    await filmRepo.save(film);
  }
}
