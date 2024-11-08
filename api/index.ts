import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./src/db/data-source";
import UserResolver from "./src/resolvers/UserResolver";
import AvatarResolver from "./src/resolvers/AvatarResolver";
import FilmResolver from "./src/resolvers/FilmResolver";
import CategoryResolver from "./src/resolvers/CategoryResolver";
import UserRatingResolver from "./src/resolvers/UserRatingResolver";
import UserCommentResolver from "./src/resolvers/UserCommentResolver";

const { APP_PORT } = process.env;

(async () => {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      AvatarResolver,
      FilmResolver,
      CategoryResolver,
      UserRatingResolver,
      UserCommentResolver,
    ],
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(APP_PORT) },
  });
  console.info(`🚀  Server ready at: ${url}`);
})();
