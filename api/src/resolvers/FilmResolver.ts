import { Film } from "../entities/Film";
import { Query, Resolver } from "type-graphql";

@Resolver(Film)
export default class FilmResolver {
  @Query(() => [Film])
  async fullfilms() {
    const films = await Film.find();
    return films;
  }
}
