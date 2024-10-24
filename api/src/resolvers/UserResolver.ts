import { IsEmail, IsString, MaxLength } from "class-validator";
import { User } from "../entities/User";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { Avatar } from "../entities/Avatar";

@InputType()
class UserInput implements Partial<User> {
  @Field({ nullable: false })
  @IsString()
  @MaxLength(10)
  username!: string;

  @Field({ nullable: false })
  @IsString()
  @IsEmail()
  email!: string;

  @Field({ nullable: false })
  @IsString()
  password!: string;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async getOneUser(@Arg("id", () => Number) id: number) {
    try {
      const user = await User.findOneOrFail({
        where: { id },
        relations: { avatar: true },
      });
      return user;
    } catch (error) {
      throw new GraphQLError(
        `Impossible de trouver l'utilisateur portant l'id ${id} , veuillez réessayer.`,
        {
          originalError: error,
          extensions: {
            code: 404,
          },
        }
      );
    }
  }

  @Query(() => [User])
  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new GraphQLError(
        `Impossible de récupérer des utilisateurs, veuillez réessayer.`,
        {
          originalError: error,
          extensions: {
            code: 404,
          },
        }
      );
    }
  }

  @Mutation(() => User)
  async createUser(@Arg("body") newUser: UserInput) {
    try {
      const user = new User();
      user.username = newUser.username;
      user.email = newUser.email;
      user.password = newUser.password;
      user.avatar = await Avatar.findOneOrFail({ where: { id: 1 } });

      await user.save();
    } catch (error) {
      throw new GraphQLError(
        "Impossible de créer un nouvel utilisateur, veuillez réessayer.",
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
