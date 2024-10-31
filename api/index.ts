import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./src/db/data-source";
import { UserResolver } from "./src/resolvers/User";
import FilmResolver from "./src/resolvers/FilmResolver";

const { APP_PORT } = process.env;

(async () => {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [UserResolver, FilmResolver],
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(APP_PORT) },
  });
  console.info(`🚀  Server ready at: ${url}`);
})();
