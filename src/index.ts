import express, { Application } from "express";
import errorHandler from "./handlers/ErrorHandler";
import allRoutes from "./routes";
import httpStatus from "http-status";
import ApiError from "./exceptions/ApiErrorException";
import { config } from "./config";
import sequelizeConnection from "./config/database";
import Wallet, { WalletMap } from "./models/Wallets";
import { CurrencyMap } from "./models/Currency";
import currencyService from "./services/CurrencyService";
import User, { UserMap } from "./models/Users";

const app: Application = express();

const PORT = config.port || 3500;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", allRoutes);

app.use((_, __, next) => {
  next(new ApiError("Not found", httpStatus.NOT_FOUND));
});

// Sets Error Handlers
app.use(errorHandler.errorConverter);
app.use(errorHandler.errorHandler);

// Creates Models
UserMap(sequelizeConnection);
CurrencyMap(sequelizeConnection);
WalletMap(sequelizeConnection);

// Associations
User.hasMany(Wallet);
Wallet.belongsTo(User);
// Wallet.hasOne(Currency);
// Currency.belongsToMany(Wallet);

sequelizeConnection
  .sync()
  .then((res) => {
    console.log("DB Connected Successfully to", res?.config.database);
    app.listen(PORT, () => {
      currencyService.addCurrencyToDb();

      console.log(`Listening on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
