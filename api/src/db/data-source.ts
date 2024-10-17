import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: "./db.sqlite",
  entities: [],
  synchronize: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
