import { Dialect, Sequelize } from "sequelize";
import { config } from "./";

const sequelizeConnection = new Sequelize(
  config.dbName,
  config.dbUserName,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: "mysql" as Dialect,
  }
);

export default sequelizeConnection;
