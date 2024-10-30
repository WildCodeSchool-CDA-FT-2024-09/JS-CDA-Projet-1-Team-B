import { Film } from "../entities/Film";
import { Avatar } from "../entities/Avatar";
import { User } from "../entities/User";

import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";

const { BACKEND_FILE } = process.env;

const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: `${BACKEND_FILE}`,
  entities: [Film, Avatar, User],
  synchronize: true,
  // logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
