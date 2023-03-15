import { Sequelize } from "sequelize";
import { config } from "./";

// export const sequelize = new Sequelize(
//   config.dbName,
//   config.dbUserNameName,
//   config.dbPasswordword,
//   {
//     host: config.dbHost,
//     dialect: "mysql",
//   }
// );

export const sequelizeConfig: any = {
  development: {
    username: config.dbUserName,
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: config.dbUserName,
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: config.dbUserName,
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    port: config.port,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
