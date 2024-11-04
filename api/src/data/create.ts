import { CastMember, CrewMember, FilmCredits, Film } from "../types/film.types";
import { AppDataSource } from "../db/data-source";
import { Film as FilmEntity } from "../entities/Film";
import * as fs from "fs/promises";
import * as path from "path";
import { UserComment } from "../entities/UserComment";
import { User } from "../entities/User";
import { UserRating } from "../entities/UserRating";
import { comments, ratings, users } from "../data/seedData";
import * as bcrypt from "bcrypt";
import { Avatar } from "../entities/Avatar";

async function resetDatabase() {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.startTransaction();
  try {
    // Supprimer les anciennes données de la table film
    await queryRunner.query("DELETE FROM film");
    await queryRunner.query("DELETE FROM user");
    await queryRunner.query("DELETE FROM user_comment");
    await queryRunner.query("DELETE FROM user_rating");

    // Réinitialiser les identifiants auto-incrémentés
    await queryRunner.query('DELETE FROM sqlite_sequence WHERE name = "film"');
    await queryRunner.query('DELETE FROM sqlite_sequence WHERE name = "user"');
    await queryRunner.query(
      'DELETE FROM sqlite_sequence WHERE name = "user_comment"'
    );
    await queryRunner.query(
      'DELETE FROM sqlite_sequence WHERE name = "user_rating"'
    );
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
    film.tmdbId! = filmData.id;
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

async function insertUsers(usersArray: { username: string; email: string }[]) {
  try {
    const passwordExample = "Azertyuiop123";

    const usersToSave: User[] = [];

    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(passwordExample, salt);
    for (let i = 0; i < usersArray.length; i++) {
      const user = new User();
      user.username = usersArray[i].username;
      user.email = usersArray[i].email;
      user.password = hash;
      user.avatar = (await Avatar.findOneBy({ id: 1 })) as Avatar;
      usersToSave.push(user);
    }
    await User.save(usersToSave);
  } catch (e) {
    console.error("Erreur lors du processus de seed :", e);
  }
}

async function insertComments(commentsArray: string[]) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const [{ seq: users }] = await User.query(
      `SELECT seq FROM sqlite_sequence WHERE name = "user"`
    );
    const [{ seq: films }] = await User.query(
      `SELECT seq FROM sqlite_sequence WHERE name = "film"`
    );
    const commentsToSave: UserComment[] = [];

    for (let i = 0; i <= films.seq; i++) {
      const randomComment: string =
        commentsArray[Math.floor(Math.random() * commentsArray.length)];
      const randomUserId: number = Math.floor(Math.random() * users.seq) + 1;

      const comment = new UserComment();
      comment.content = randomComment;
      comment.film = (await FilmEntity.findOneBy({ id: i })) as FilmEntity;
      comment.user = (await User.findOneBy({ id: randomUserId })) as User;
      commentsToSave.push(comment);
    }
    await UserComment.save(commentsToSave);
  } catch (e) {
    console.error("Erreur lors du processus de seed :", e);
  }
}

async function insertRatings(ratingsArray: number[]) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const users = await User.query(
      `SELECT seq FROM sqlite_sequence WHERE name = "user"`
    );
    const films: number = await User.query(
      `SELECT seq FROM sqlite_sequence WHERE name = "film"`
    );
    const ratingsToSave: UserRating[] = [];

    for (let i = 0; i <= films; i++) {
      const randomRating: number =
        ratingsArray[Math.floor(Math.random() * ratingsArray.length)];
      const randomUserId: number = Math.floor(Math.random() * users) + 1;

      const rating: UserRating = new UserRating();
      rating.film = (await FilmEntity.findOneBy({ id: i })) as FilmEntity;
      rating.user = (await User.findOneBy({ id: randomUserId })) as User;
      rating.rating = randomRating;
      ratingsToSave.push(rating);
    }
    await UserComment.save(ratingsToSave);
  } catch (e) {
    console.error("Erreur lors du processus de seed :", e);
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
    await insertUsers(users);
  } catch (err) {
    console.error("Erreur lors du processus de seed :", err);
  }
}

(async function totalSeeding() {
  try {
    await seedDatabase();
    await insertComments(comments);
    await insertRatings(ratings);
  } catch (e) {
    console.error(e);
  } finally {
    await AppDataSource.destroy();
  }
})();
