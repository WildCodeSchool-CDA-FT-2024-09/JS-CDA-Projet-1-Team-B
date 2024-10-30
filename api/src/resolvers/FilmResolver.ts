import { Resolver, Query, Arg } from "type-graphql";
import { Film } from "../entities/Film";

@Resolver(Film)
export class FilmResolver {
  @Query(() => Film, { nullable: true })
  async getFilmById(@Arg("id") id: number): Promise<Film | null> {
    try {
      const film = await Film.findOne({ where: { id } });
      return film || null;
    } catch (error) {
      console.error("Error fetching film:", error);
      throw new Error("Error retrieving film information.");
    }
  }
}
