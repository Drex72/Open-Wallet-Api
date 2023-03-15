import { NextFunction, Request, Response } from "express";
import ApiError from "../eceptions/ApiErrorException";
import * as Joi from "joi";

class AuthValidation {
  async createUserValidation(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    // Create User Schema
    const createUserValidationSchema: Joi.ObjectSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
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

    req.body = value;
    return next();
  }

  async userLoginValidation(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    // Create User Schema
    const createUserValidationSchema: Joi.ObjectSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
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

    req.body = value;
    return next();
  }
}

const authValidation = new AuthValidation();
export default authValidation;
