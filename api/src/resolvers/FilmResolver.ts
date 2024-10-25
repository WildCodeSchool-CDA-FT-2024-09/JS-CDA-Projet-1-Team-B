import { Resolver, Query, Arg } from "type-graphql";
import { Film } from "../entities/Film";
import { Criteria } from "../enums/Criteria";
import { Like } from "typeorm";

@Resolver(Film)
export class FilmResolver {
  @Query(() => [Film])
  async searchFilms(
    @Arg("searchTerm", () => String) searchTerm: string,
    @Arg("searchBy", () => Criteria) searchBy: Criteria
  ): Promise<Film[]> {
    // Nettoyage des espaces en début et fin de chaîne
    const cleanedSearchTerm = `%${searchTerm.trim()}%`;

    // Appliquer la recherche en fonction du critère
    if (searchBy === Criteria.Title) {
      return await Film.find({ where: { title: Like(cleanedSearchTerm) } });
    } else if (searchBy === Criteria.Actor) {
      return await Film.find({ where: { actors: Like(cleanedSearchTerm) } });
    } else if (searchBy === Criteria.Director) {
      return await Film.find({ where: { director: Like(cleanedSearchTerm) } });
    }

    return [];
  }
}
