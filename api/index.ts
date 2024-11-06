import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./src/db/data-source";
import UserResolver from "./src/resolvers/UserResolver";
import AvatarResolver from "./src/resolvers/AvatarResolver";
import FilmResolver from "./src/resolvers/FilmResolver";
import CategoryResolver from "./src/resolvers/CategoryResolver";

const { APP_PORT } = process.env;

(async () => {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [UserResolver, AvatarResolver, FilmResolver, CategoryResolver],
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(APP_PORT) },
  });
  console.info(`🚀  Server ready at: ${url}`);
})();
