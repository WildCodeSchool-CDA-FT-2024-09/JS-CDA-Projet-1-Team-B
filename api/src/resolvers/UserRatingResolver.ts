import { UserRating } from "../entities/UserRating";
import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { GraphQLError } from "graphql/index";

@Resolver(UserRating)
export default class UserRatingResolver {
  @Query(() => [UserRating], { nullable: true })
  async getUserRating(@Arg("id") id: number) {
    try {
      const [user] = await User.findBy({ id: id });
      if (!user) {
        throw new GraphQLError("Aucun utilisateur trouvé, veuillez réessayer.");
      }

      const rating = await UserRating.find({
        where: { user: user },
        relations: ["film"],
      });
      if (!rating) {
        throw new GraphQLError(
          "Impossible de récupérer les notes, veuillez réessayer."
        );
      }
      return rating;
    } catch (error) {
      throw new GraphQLError(error, {
        extensions: {
          code: 404,
        },
      });
    }
  }
}
