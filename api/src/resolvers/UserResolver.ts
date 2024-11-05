import { GraphQLError } from "graphql";
import * as bcrypt from "bcrypt";
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from "class-validator";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import { Avatar } from "../entities/Avatar";

@InputType()
class NewUserInput implements Partial<User> {
  @Field({ nullable: false })
  @IsString()
  @MinLength(3, { message: "Minimum 3 caractères" })
  @MaxLength(10, { message: "Maximum 10 caractères" })
  @Matches(/^[a-zA-Z0-9]*$/)
  @NotContains(" ", { message: "Merci de ne pas inclure d'espace." })
  username!: string;

  @Field({ nullable: false })
  @IsString()
  @IsEmail()
  @NotContains(" ", { message: "Merci de ne pas inclure d'espace." })
  email!: string;

  @Field({ nullable: false })
  @IsString()
  @MinLength(12, { message: "Minimum 12 caractères" })
  @MaxLength(50, { message: "Maximum 50 caractères" })
  @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){1,}$/, {
    message:
      "Doit comporter une majuscule, une minuscle, un chiffre et aucun espace.",
  })
  password!: string;
}

@InputType()
class GetUserInput {
  @Field({ nullable: false })
  @IsString()
  @IsEmail()
  @NotContains(" ", { message: "Merci de ne pas inclure d'espace." })
  email!: string;

  @Field({ nullable: false })
  @IsString()
  @NotContains(" ", { message: "Merci de ne pas inclure d'espace." })
  password!: string;
}

@ObjectType()
class GetUserOutput {
  @Field({ nullable: false })
  @IsString()
  @IsEmail()
  @NotContains(" ", { message: "Merci de ne pas inclure d'espace." })
  email!: string;

  @Field({ nullable: false })
  @IsString()
  @NotContains(" ", { message: "Merci de ne pas inclure d'espace." })
  username!: string;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => GetUserOutput)
  async signIn(@Arg("body") body: GetUserInput) {
    try {
      const user = await User.findOne({
        where: { email: body.email },
        relations: { avatar: true },
      });

      if (user === null) {
        throw new GraphQLError("Identifiants incorrects, veuillez réessayer.");
      }
      const match = await bcrypt.compare(body.password, user.password);

      if (!match) {
        throw new GraphQLError("Identifiants incorrects, veuillez réessayer.");
      }

      return user;
    } catch (error) {
      throw new GraphQLError(error, {
        extensions: {
          code: 404,
        },
      });
    }
  }

  @Query(() => User, { nullable: true })
  async getUserByEmail(@Arg("email") email: string): Promise<User | null> {
    try {
      const user = await User.findOne({
        where: { email },
        relations: ["avatar"],
      });

      return user || null;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Error retrieving user information.");
    }
  }

  @Mutation(() => String)
  async signUp(@Arg("body") newUser: NewUserInput) {
    try {
      const { username, email, password } = newUser;

      const salt = await bcrypt.genSalt(15);
      const hash = await bcrypt.hash(password, salt);

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
