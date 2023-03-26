import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiErrorException";
import * as Joi from "joi";
import Currency, { CurrencyMap } from "../models/Currency";
import sequelizeConnection from "../config/database";

class WalletValidation {
  async createNewWalletValidation(req: Request, res: any, next: NextFunction) {
    const { body } = req;
    // CurrencyMap(sequelizeConnection);

    const allCurrenciesObject = await Currency.findAll();
    // const allCurrenciesValues = allCurrenciesObject.map(
    //   (currency) => currency.dataValues.currencyName
    // );

    // Create User Schema
    const createUserValidationSchema: Joi.ObjectSchema = Joi.object({
      currency: Joi.string().required().case("upper").min(3).max(3),
    });

    // Schema Options
    const schemaOptions: Joi.ValidationOptions = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };

    const { error, value } = createUserValidationSchema.validate(
      body,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      const errorMessage = error.details
        .map((detail) => {
          return detail.message;
        })
        .join(", ");
      // Add our Error handler
      return next(new ApiError(errorMessage, 400));
    }
    const currentCurrency = allCurrenciesObject.find(
      (item) =>
        item.dataValues?.currencyName === req.body?.currency.toLocaleUpperCase()
    );
    if (!currentCurrency) {
      return next(new ApiError("Not a Valid Currency", 400));
    } else {
      req.body = { ...value, currencyId: currentCurrency.dataValues.id };
    }

    return next();
  }

  async getWalletByIdValidation(req: Request, res: any, next: NextFunction) {
    const { params } = req;

    // Create User Schema
    const createUserValidationSchema: Joi.ObjectSchema = Joi.object({
      id: Joi.string().required(),
    });

    // Schema Options
    const schemaOptions: Joi.ValidationOptions = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };

    const { error, value } = createUserValidationSchema.validate(
      params,
      schemaOptions
    );

    // If Error, handle Error
    if (error) {
      const errorMessage = error.details
        .map((detail) => {
          return detail.message;
        })
        .join(", ");
      // Add our Error handler
      return next(new ApiError(errorMessage, 400));
    }

    return next();
  }
}

const walletValidation = new WalletValidation();
export default walletValidation;
