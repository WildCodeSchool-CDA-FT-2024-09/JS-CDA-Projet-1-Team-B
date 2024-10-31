import { IsString } from "class-validator";
import { Avatar } from "../entities/Avatar";
import { GraphQLError } from "graphql";
import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";

@InputType()
class AvatarInput implements Partial<Avatar> {
  @Field({ nullable: false })
  @IsString()
  image!: string;
}

@Resolver(Avatar)
export default class AvatarResolver {
  @Mutation(() => Number)
  async createAvatar(@Arg("body") newAvatar: AvatarInput) {
    try {
      const avatar = new Avatar();
      avatar.image = newAvatar.image!;
      await avatar.save();
      return avatar.id;
    } catch (error) {
      throw new GraphQLError(
        `Impossible de créer un nouvel avatar, veuillez réessayer.`,
        {
          originalError: error,
          extensions: {
            code: 404,
          },
        }
      );
    }
  }
}
