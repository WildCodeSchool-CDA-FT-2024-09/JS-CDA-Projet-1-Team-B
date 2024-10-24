import { Resolver, Query, Arg } from "type-graphql";
import { Film } from "../entities/Film";

@Resolver(Film)
export class FilmResolver {
  @Query(() => [Film])
  async searchFilms(
    @Arg("title", { nullable: true }) title: string
  ): Promise<Film[]> {
    const filmsQuery = Film.createQueryBuilder("film");

    // Si un titre est fourni
    if (title) {
      const trimmedTitle = title.trim(); // Supprime les espaces avant et après
      const keywords = trimmedTitle.split(" "); // Sépare les mots

      // Recherche chaque mot dans le titre
      keywords.forEach((keyword, index) => {
        filmsQuery.andWhere(`LOWER(film.title) LIKE LOWER(:keyword${index})`, {
          [`keyword${index}`]: `%${keyword}%`,
        });
      });
    }

    return await filmsQuery.getMany();
  }
}
