import { CastMember, CrewMember, FilmCredits, Film } from "../types/film.types";
import { AppDataSource } from "../db/data-source";
import { Film as FilmEntity } from "../entities/Film";
import { Avatar as AvatarEntity } from "../entities/Avatar";
import { User as UserEntity } from "../entities/User";
import * as fs from "fs/promises";
import * as path from "path";

const avatarImages = [
  "/avatars/batman.png",
  "/avatars/fear-face.png",
  "/avatars/joker.png",
  "/avatars/scream-face.png",
  "/avatars/wonder-woman.png",
];

const usersData = [
  {
    username: "dark_suspense",
    email: "dark.suspense@example.com",
    password: "thriller123",
    avatarId: 1,
  },
  {
    username: "mystery_hunter",
    email: "mystery.hunter@example.com",
    password: "suspense456",
    avatarId: 2,
  },
  {
    username: "noir_master",
    email: "noir.master@example.com",
    password: "darkness789",
    avatarId: 3,
  },
  {
    username: "chilling_thrill",
    email: "chilling.thrill@example.com",
    password: "fearless101",
    avatarId: 4,
  },
  {
    username: "shadow_watcher",
    email: "shadow.watcher@example.com",
    password: "ghostly202",
    avatarId: 5,
  },
];

// Reset the database by dropping tables and clearing data
async function resetDatabase() {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.startTransaction();
  try {
    // Supprimer les anciennes données de la table film
    await queryRunner.query("DELETE FROM film");

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

// Function to insert an avatar
async function insertAvatar(imagePath: string) {
  const avatar = new AvatarEntity();
  avatar.image = imagePath;

  await avatar.save(); // Save the avatar entity to the database
}

// Function to seed avatars
async function seedAvatars() {
  for (const image of avatarImages) {
    await insertAvatar(image);
  }
}

// Function to insert a user
async function insertUser(userData: {
  username: string;
  email: string;
  password: string;
  avatarId: number;
}) {
  const avatar = await AvatarEntity.findOne({
    where: { id: userData.avatarId },
  });

  if (!avatar) {
    console.error(`Avatar with ID ${userData.avatarId} not found`);
    return; // Skip creating this user if the avatar does not exist
  }

  const user = new UserEntity();
  user.username = userData.username;
  user.email = userData.email;
  user.password = userData.password; // Ensure this is hashed in production
  user.avatar = avatar; // Set the avatar relation

  await user.save(); // Save the user entity to the database
}

// Function to seed users
async function seedUsers() {
  for (const user of usersData) {
    await insertUser(user);
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

async function seedDatabase() {
  try {
    // Initialiser la connexion à la base de données
    await AppDataSource.initialize();

    // Réinitialiser la base de données avant d'ajouter de nouvelles données
    await resetDatabase();

    // Seed avatars
    await seedAvatars();

    // Seed users
    await seedUsers();

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
