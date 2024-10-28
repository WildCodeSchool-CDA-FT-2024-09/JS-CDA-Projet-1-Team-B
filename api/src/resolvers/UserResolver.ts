import { GraphQLError } from "graphql";
import * as bcrypt from "bcrypt";
import { IsEmail, IsString, MaxLength } from "class-validator";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { Avatar } from "../entities/Avatar";
import { schema } from "../types/SignIn.types";

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

@InputType()
class GetUserInput {
  @Field()
  @IsString()
  email!: string;

  @Field({ nullable: false })
  @IsString()
  password!: string;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => User)
  async getOneUser(@Arg("body") body: GetUserInput) {
    try {
      const user = await User.findOne({
        select: { username: true, email: true, password: true },
        where: { email: body.email },
        // relations: { avatar: true },
      });

      if (user === null) {
        throw new GraphQLError(
          `Impossible de trouver l'utilisateur portant l'e-mail ${body.email} , veuillez réessayer.`
        );
      }

      const match = await bcrypt.compare(body.password, user.password);
      if (!match) {
        throw new GraphQLError("Mot de passe erroné");
      }

      user.password = "deleted";
      return user;
    } catch (error) {
      throw new GraphQLError(
        `Erreur de trouver l'utilisateur, veuillez réessayer.`,
        {
          originalError: error,
          extensions: {
            code: 404,
          },
        }
      );
    }
  }

  @Mutation(() => Number)
  async createUser(@Arg("body") newUser: UserInput) {
    try {
      const result = schema.safeParse(newUser);
      if (!result.success) {
        throw new GraphQLError("Les données sont erronées.");
      }

      const salt = await bcrypt.genSaltSync(15);
      const hash = await bcrypt.hashSync(newUser.password, salt);
      newUser.password = "deleted";

      const user = new User();
      user.username = newUser.username;
      user.email = newUser.email;
      user.password = hash;
      user.avatar = await Avatar.findOneOrFail({ where: { id: 1 } });

      await user.save();
      return user.id;
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
