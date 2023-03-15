import * as dotenv from "dotenv";

dotenv.config();

type configType = {
  port: string;
  dbName: string;
  dbUserName: string;
  dbHost: string;
  dbPassword: string;
  env: string;
};
export const config = Object.freeze({
  port: process.env.PORT,
  dbName: process.env.DB_NAME,
  dbUserName: process.env.DB_USERNAME,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  env: process.env.NODE_ENV,
} as configType);
