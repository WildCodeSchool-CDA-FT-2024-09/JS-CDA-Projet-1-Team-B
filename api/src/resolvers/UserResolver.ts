import { GraphQLError } from "graphql";
import * as bcrypt from "bcrypt";
import { IsEmail, IsString, MaxLength } from "class-validator";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { Avatar } from "../entities/Avatar";
import { schema } from "../types/User.types";

@InputType()
class NewUserInput implements Partial<User> {
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

  @Field({ nullable: false })
  @IsString()
  confirmPassword!: string;
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
        where: { email: body.email },
        relations: { avatar: true },
      });

      if (user === null) {
        throw new GraphQLError("E-mail incorrect, veuillez réessayer.");
      }

      const match = await bcrypt.compare(body.password, user.password);
      if (!match) {
        throw new GraphQLError("Mot de passe erroné, veuillez réessayer.");
      }

      user.password = "deleted";

      return user;
    } catch (error) {
      throw new GraphQLError(error, {
        extensions: {
          code: 404,
        },
      });
    }
  }

  @Mutation(() => String)
  async createUser(@Arg("body") newUser: NewUserInput) {
    try {
      const result = schema.safeParse(newUser);
      if (!result.success) {
        throw new GraphQLError("Les données reçues sont erronées.");
      }

      newUser = { ...newUser, password: "deleted", confirmPassword: "deleted" };
      result.data = {
        ...result.data,
        confirmPassword: "deleted",
      };

      const { username, email, password } = result.data;

      const salt = await bcrypt.genSalt(15);
      const hash = await bcrypt.hash(password, salt);

      result.data = {
        ...result.data,
        password: "deleted",
      };

      const user = new User();
      user.username = username;
      user.email = email;
      user.password = hash;

      user.avatar = (await Avatar.findOne({ where: { id: 1 } })) as Avatar;
      if (user.avatar === null) {
        throw new GraphQLError(
          "Impossible de récupérer l'avatar par défaut, veuillez réessayer plus tard."
        );
      }

      try {
        await user.save();
      } catch (e) {
        const message = String(e.driverError);

        if (message.includes("UNIQUE") && message.includes("username")) {
          throw new GraphQLError(
            "Pseudo déjà utiliser, veuillez en choisir un autre."
          );
        } else if (message.includes("UNIQUE") && message.includes("email")) {
          throw new GraphQLError(
            "E-mail déjà utiliser, veuillez en choisir un autre."
          );
        } else {
          throw new GraphQLError(
            "Impossible de créer votre compte, veuillez réessayer plus tard."
          );
        }
      }

      return user.username;
    } catch (error) {
      throw new GraphQLError(error, {
        extensions: {
          code: 400,
        },
      });
    }
  }
}
