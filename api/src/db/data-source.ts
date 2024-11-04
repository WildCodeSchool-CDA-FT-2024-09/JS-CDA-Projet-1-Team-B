import { User } from "../entities/User";
import { Film } from "../entities/Film";
import { Avatar } from "../entities/Avatar";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import { UserComment } from "../entities/UserComment";
import { UserRating } from "../entities/UserRating";

const { BACKEND_FILE } = process.env;

const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: `${BACKEND_FILE}`,
  entities: [User, Avatar, Film, UserComment, UserRating],
  synchronize: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
