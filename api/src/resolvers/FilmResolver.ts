import { Between, Like } from "typeorm";
import { Film } from "../entities/Film";
import { Arg, Int, Query, Resolver } from "type-graphql";
import { Criteria } from "../enums/Criteria";

@Resolver(Film)
export default class FilmResolver {
  @Query(() => [Film], { nullable: true })
  async trendyFilms(
    @Arg("limit", { nullable: true, defaultValue: 3 }) limit: number
  ): Promise<Film[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return Film.find({
      where: {
        releaseDate: Between(
          oneMonthAgo.toISOString(),
          new Date().toISOString()
        ),
      },
      order: {
        popularity: "DESC",
      },
      take: limit,
    });
  }

  @Query(() => [Film], { nullable: true })
  async lastFilms(
    @Arg("limit", { nullable: true, defaultValue: 4 }) limit: number
  ): Promise<Film[]> {
    return Film.find({
      order: {
        releaseDate: "DESC",
      },
      take: limit,
    });
  }

  @Query(() => [Film], { nullable: true })
  async FrenchFilms(
    @Arg("limit", { nullable: true, defaultValue: 4 }) limit: number
  ): Promise<Film[]> {
    return Film.find({
      where: {
        originalLanguage: "fr",
      },
      order: {
        releaseDate: "DESC",
      },
      take: limit,
    });
  }

  @Query(() => Film, { nullable: true })
  async getFilmById(@Arg("id", () => Int) id: number): Promise<Film | null> {
    const film = await Film.findOne({ where: { id } });
    return film || null;
  }

  @Query(() => [Film])
  async searchFilms(
    @Arg("searchTerm", () => String) searchTerm: string,
    @Arg("searchBy", () => Criteria) searchBy: Criteria,
    @Arg("category", () => Int, { nullable: true }) category: number
  ): Promise<Film[]> {
    if (category) {
      return await Film.find({
        relations: ["categories"],
        where: {
          categories: { id: category },
        },
      });
    }
    // Trim spaces at the start and end of the string
    const cleanedSearchTerm = `%${searchTerm.trim()}%`;

    return await Film.find({
      where: { [searchBy]: Like(cleanedSearchTerm) },
      relations: ["categories"],
    });
  }
}
