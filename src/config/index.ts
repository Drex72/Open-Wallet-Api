import * as dotenv from "dotenv";

dotenv.config();

type configType = {
  port: string;
  dbName: string;
  dbUserName: string;
  dbHost: string;
  dbPassword: string;
  env: string;
  accessTokenSecret: string;
  refreshTokenSecret: string;
  fixerIoApiKey: string;
};
export const config = Object.freeze({
  port: process.env.PORT,
  dbName: process.env.DB_NAME,
  dbUserName: process.env.DB_USERNAME,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  env: process.env.NODE_ENV,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  fixerIoApiKey: process.env.FIXER_IO_API_KEY,
} as configType);
