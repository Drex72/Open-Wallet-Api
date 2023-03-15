import { Sequelize } from "sequelize";
import { config } from "./";

export const sequelize = new Sequelize(
  config.dbName,
  config.dbUserName,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: "mysql",
  }
);
