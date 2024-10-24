import { Film } from "../entities/Film";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(Film)
export default class FilmResolver {
  @Query(() => [Film])
  async films(): Promise<Film[]> {
    return Film.find();
  }

  @Query(() => Film, { nullable: true })
  async film(@Arg("id") id: number): Promise<Film | null> {
    return Film.findOneBy({ id });
  }

  @Query(() => [Film], { nullable: true })
  async trendyFilms(
    @Arg("limit", { nullable: true, defaultValue: 3 }) limit: number
  ): Promise<Film[]> {
    return Film.find({
      order: {
        releaseDate: "DESC",
        popularity: "DESC",
      },
      take: limit,
    });
  }
}
