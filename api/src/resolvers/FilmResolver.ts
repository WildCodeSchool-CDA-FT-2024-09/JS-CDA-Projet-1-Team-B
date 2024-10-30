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

    return await Film.find({ where: { [searchBy]: Like(cleanedSearchTerm) } });
  }
}
