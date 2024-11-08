import { UserComment } from "../entities/UserComment";
import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { GraphQLError } from "graphql/index";

@Resolver(UserComment)
export default class UserCommentResolver {
  @Query(() => [UserComment], { nullable: true })
  async getUserComment(@Arg("id") id: number) {
    try {
      const [user] = await User.findBy({ id: id });
      if (!user) {
        throw new GraphQLError("Aucun utilisateur trouvé, veuillez réessayer.");
      }
      const comment = await UserComment.find({
        where: { user: user },
        relations: ["film"],
      });
      if (!comment) {
        throw new GraphQLError(
          "Impossible de récupérer les commentaires, veuillez réessayer."
        );
      }

      return comment;
    } catch (error) {
      throw new GraphQLError(error, {
        extensions: {
          code: 404,
        },
      });
    }
  }
}
