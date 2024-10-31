import { Between } from "typeorm";
import { Film } from "../entities/Film";
import { Arg, Query, Resolver } from "type-graphql";

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
}
