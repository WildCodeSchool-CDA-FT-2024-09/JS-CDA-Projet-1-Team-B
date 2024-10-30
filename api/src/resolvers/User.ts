import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../entities/User";
//import { Avatar } from "../entities/Avatar";

// @Resolver(User)
// export class UserResolver {
//   @Query(() => Avatar, { nullable: true })
//   async getUserAvatar(@Arg("userId") userId: number): Promise<Avatar | null> {
//     const user = await User.findOne({
//       where: { id: userId },
//       relations: ["avatar"],
//     });

//     if (!user || !user.avatar) {
//       throw new Error(`User with ID ${userId} or their Avatar not found`);
//     }

//     return user.avatar;
//   }
// }

@Resolver()
export class UserResolver {
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
}
