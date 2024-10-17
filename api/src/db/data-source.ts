import { Avatar } from "../entities/Avatar";
import { Film } from "../entities/Film";
import { User } from "../entities/User";
import { UserComments } from "../entities/UserComments";
import { UserFavorites } from "../entities/UserFavorites";
import { UserRating } from "../entities/UserRating";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";

const { BACKEND_FILE } = process.env;

const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: `${BACKEND_FILE}`,
  entities: [Film, User, UserComments, UserFavorites, UserRating, Avatar],
  synchronize: true,
  // logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
