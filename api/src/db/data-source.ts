import { User } from "../entities/User";
import { Avatar } from "../entities/Avatar";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";

const { BACKEND_FILE } = process.env;

const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: `${BACKEND_FILE}`,
  entities: [User, Avatar],
  synchronize: true,
  // logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
