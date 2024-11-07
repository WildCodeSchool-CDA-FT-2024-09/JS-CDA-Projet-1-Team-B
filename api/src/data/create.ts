import { CastMember, CrewMember, Film, FilmCredits } from "../types/film.types";
import { AppDataSource } from "../db/data-source";
import { Film as FilmEntity } from "../entities/Film";
import { Category as CategoryEntity } from "../entities/Category";
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
    // Supprimer les anciennes données des différentes tables
    await queryRunner.query("DELETE FROM user_comment");
    await queryRunner.query("DELETE FROM user_rating");
    await queryRunner.query("DELETE FROM user");
    await queryRunner.query("DELETE FROM avatar");
    await queryRunner.query("DELETE FROM film");
    await queryRunner.query("DELETE FROM Category");

    // Réinitialiser les identifiants auto-incrémentés
    await queryRunner.query("DELETE FROM sqlite_sequence");

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
// Tableau permettant de savoir combien de films sont insérés en BDD.
const filmsTotal: number[] = [];

// Fonction pour insérer un film
async function insertFilm(
  filmData: Film,
  filmCredits: FilmCredits,
  countFilms: number[],
  allCategories: CategoryEntity[]
) {
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

    countFilms.push(film.tmdbId);
    // Associer les catégories correspondantes
    const matchingCategories = allCategories.filter((category) =>
      filmData.genre_ids.includes(category.id)
    );

    // Assigner les catégories trouvées au film
    film.categories = matchingCategories;

    // Sauvegarder le film
    await film.save();
  }
}

async function insertAvatars(avatarPathFolder: string): Promise<void> {
  try {
    const avatarToSave: Avatar[] = [];

    const files = await fs.readdir(avatarPathFolder, {
      withFileTypes: true,
    });

    const avatarPaths = files.filter((e) => e.isFile()).map((e) => e.name);

    for (const path of avatarPaths) {
      const avatar = new Avatar();
      avatar.image = path;
      avatarToSave.push(avatar);
    }

    await Avatar.save(avatarToSave);
  } catch (e) {
    console.error("Erreur lors du processus de seed des avatars :", e);
  }
}

async function insertUsers(
  usersArray: { username: string; email: string }[]
): Promise<number> {
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
    return usersToSave.length;
  } catch (e) {
    console.error("Erreur lors du processus de seed des utilisateurs :", e);
    return e;
  }
}

async function insertComments(
  commentsArray: string[],
  countFilms: number,
  countUsers: number
): Promise<void> {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const commentsToSave: UserComment[] = [];

    for (let i = 1; i <= countFilms; i++) {
      const randomComment: string =
        commentsArray[Math.floor(Math.random() * commentsArray.length)];
      const randomUserId: number = Math.floor(Math.random() * countUsers) + 1;

      const comment = new UserComment();
      comment.content = randomComment;
      comment.film = (await FilmEntity.findOneBy({ id: i })) as FilmEntity;
      comment.user = (await User.findOneBy({ id: randomUserId })) as User;
      commentsToSave.push(comment);
    }
    await UserComment.save(commentsToSave);
  } catch (e) {
    console.error("Erreur lors du processus de seed des commentaires :", e);
  }
}

async function insertRatings(
  ratingsArray: number[],
  countFilms: number,
  countUsers: number
): Promise<void> {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const ratingsToSave: UserRating[] = [];

    for (let i = 1; i <= countFilms; i++) {
      const randomRating: number =
        ratingsArray[Math.floor(Math.random() * ratingsArray.length)];
      const randomUserId: number = Math.floor(Math.random() * countUsers) + 1;

      const rating: UserRating = new UserRating();
      rating.film = (await FilmEntity.findOneBy({ id: i })) as FilmEntity;
      rating.user = (await User.findOneBy({ id: randomUserId })) as User;
      rating.rating = randomRating;
      ratingsToSave.push(rating);
    }
    await UserRating.save(ratingsToSave);
  } catch (e) {
    console.error("Erreur lors du processus de seed des notes de films :", e);
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

    const categoriesData = await fs.readFile(
      path.join(__dirname, "categories.json"),
      { encoding: "utf-8" }
    );

    const films: Film[] = JSON.parse(rawData);
    const credits: FilmCredits[] = JSON.parse(creditsData);
    const categories = JSON.parse(categoriesData);

    await Promise.all(
      categories.map(async (category: { id: number; name: string }) => {
        let categoryEntity = await CategoryEntity.findOneBy({
          id: category.id,
        });
        if (!categoryEntity) {
          categoryEntity = new CategoryEntity();
          categoryEntity.id = category.id;
          categoryEntity.name = category.name;
          await categoryEntity.save();
        }
      })
    );

    const allCategories = await CategoryEntity.find();

    await Promise.all(
      films.map(async (filmData: Film) => {
        const filmCredits = credits.find(
          (credit: FilmCredits) => credit.filmId === filmData.id
        );
        if (filmCredits) {
          await insertFilm(filmData, filmCredits, filmsTotal, allCategories);
        }
      })
    );
  } catch (err) {
    console.error("Erreur lors du processus de seed de la DB :", err);
    return err;
  }
}

(async function totalSeeding() {
  try {
    await seedDatabase();
    await insertAvatars("../client/public/avatar");
    const countUsers: number = await insertUsers(users);

    if (filmsTotal.length > 0 && countUsers > 0) {
      await insertComments(comments, filmsTotal.length, countUsers);
      await insertRatings(ratings, filmsTotal.length, countUsers);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await AppDataSource.destroy();
  }
})();
