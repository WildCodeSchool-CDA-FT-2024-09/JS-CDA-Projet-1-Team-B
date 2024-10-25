import { Between } from "typeorm";
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
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2);

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
  async popularFilms(
    @Arg("limit", { nullable: true, defaultValue: 3 }) limit: number
  ): Promise<Film[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2);

    return Film.find({
      order: {
        popularity: "DESC",
      },
      take: limit,
    });
  }
}
