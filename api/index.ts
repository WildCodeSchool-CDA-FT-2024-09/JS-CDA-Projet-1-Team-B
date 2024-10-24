import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./src/db/data-source";
import FilmResolver from "./src/resolvers/Film.resolvers";

const { APP_PORT } = process.env;

(async () => {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [FilmResolver],
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(APP_PORT) },
  });
  console.info(`🚀  Server ready at: ${url}`);
})();
