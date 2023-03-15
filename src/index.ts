import express from "express";
import errorHandler from "./handlers/ErrorHandler";
import allRoutes from "./routes";
import httpStatus from "http-status";
import ApiError from "./eceptions/ApiErrorException";
const app = express();

const PORT = process.env.PORT || 3500;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", allRoutes);

app.use((_, __, next) => {
  next(new ApiError("Not found", httpStatus.NOT_FOUND));
});

app.use(errorHandler.errorConverter);
app.use(errorHandler.errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
