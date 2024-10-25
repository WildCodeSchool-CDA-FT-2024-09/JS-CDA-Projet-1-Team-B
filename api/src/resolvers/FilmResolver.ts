import { Resolver, Query, Arg } from "type-graphql";
import { Film } from "../entities/Film";
import { Criteria } from "../enums/Criteria";

@Resolver(Film)
export class FilmResolver {
  @Query(() => [Film])
  async searchFilms(
    @Arg("searchTerm", () => String) searchTerm: string,
    @Arg("searchBy", () => Criteria) searchBy: Criteria
  ): Promise<Film[]> {
    const filmsQuery = Film.createQueryBuilder("film");

    // Nettoyage des espaces en début et fin de chaîne
    const cleanedSearchTerm = searchTerm.trim();

    // Appliquer la recherche en fonction du critère
    if (searchBy === Criteria.Title) {
      filmsQuery.where(`LOWER(film.title) LIKE LOWER(:searchTerm)`, {
        searchTerm: `%${cleanedSearchTerm}%`,
      });
    } else if (searchBy === Criteria.Actor) {
      filmsQuery.where(`LOWER(film.actors) LIKE LOWER(:searchTerm)`, {
        searchTerm: `%${cleanedSearchTerm}%`,
      });
    } else if (searchBy === Criteria.Director) {
      filmsQuery.where(`LOWER(film.director) LIKE LOWER(:searchTerm)`, {
        searchTerm: `%${cleanedSearchTerm}%`,
      });
    }

    return await filmsQuery.getMany();
  }
}
