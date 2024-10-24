import { Resolver, Query, Arg } from "type-graphql";
import { Film } from "../entities/Film";

@Resolver(Film)
export class FilmResolver {
  @Query(() => [Film])
  async searchFilms(
    @Arg("title", () => String, { nullable: true }) title: string | null,
    @Arg("actorName", () => String, { nullable: true })
    actorName: string | null,
    @Arg("director", () => String, { nullable: true }) director: string | null
  ): Promise<Film[]> {
    const filmsQuery = Film.createQueryBuilder("film");

    // Recherche par titre
    if (title && title.trim()) {
      const trimmedTitle = title.trim(); // Supprime les espaces avant et après
      const keywords = trimmedTitle.split(" "); // Sépare les mots

      // Recherche chaque mot dans le titre
      keywords.forEach((keyword, index) => {
        filmsQuery.orWhere(`LOWER(film.title) LIKE LOWER(:keyword${index})`, {
          [`keyword${index}`]: `%${keyword}%`,
        });
      });
    }

    // Recherche par acteur
    if (actorName && actorName.trim()) {
      const trimmedActorName = actorName.trim();
      const actorKeywords = trimmedActorName.split(" ");

      // Recherche chaque mot dans la chaîne d'acteurs
      actorKeywords.forEach((keyword, index) => {
        filmsQuery.orWhere(
          `LOWER(film.actors) LIKE LOWER(:actorKeyword${index})`,
          {
            [`actorKeyword${index}`]: `%${keyword}%`,
          }
        );
      });
    }

    // Recherche par réalisateur
    if (director && director.trim()) {
      const trimmedDirector = director.trim();
      const directorKeywords = trimmedDirector.split(" ");

      // Recherche chaque mot dans le champ réalisateur
      directorKeywords.forEach((keyword, index) => {
        filmsQuery.orWhere(
          `LOWER(film.director) LIKE LOWER(:directorKeyword${index})`,
          {
            [`directorKeyword${index}`]: `%${keyword}%`,
          }
        );
      });
    }

    return await filmsQuery.getMany();
  }
}
