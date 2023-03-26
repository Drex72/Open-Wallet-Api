import express, { Application } from "express";
import errorHandler from "./handlers/ErrorHandler";
import allRoutes from "./routes";
import httpStatus from "http-status";
import ApiError from "./exceptions/ApiErrorException";
import { config } from "./config";
import sequelizeConnection from "./config/database";

const app: Application = express();

const PORT = config.port || 3500;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", allRoutes);

app.use((_, __, next) => {
  next(new ApiError("Not found", httpStatus.NOT_FOUND));
});

app.use(errorHandler.errorConverter);
app.use(errorHandler.errorHandler);

sequelizeConnection
  .sync({ force: true })
  .then((res) => {
    console.log("DB Connected Successfully to", res.config.database);
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
