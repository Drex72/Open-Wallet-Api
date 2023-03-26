import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import httpStatus from "http-status";
import ApiError from "../exceptions/ApiErrorException";

class ErrorHandler {
  errorConverter = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let error = err;
    if (!(error instanceof ApiError)) {
      const statusCode = error.statusCode
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || httpStatus[statusCode];
      error = new ApiError(message, statusCode, false, err.stack);
    }
    next(error);
  };
  errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let { statusCode, message } = err;

    if (err instanceof ApiError) {
      res.locals.errorMessage = err.message;

      const response = {
        code: statusCode,
        message,
        ...(config.env === "development" && { stack: err.stack }),
      };

      return res.status(statusCode).send(response);
    }
    return err;
  };
}

const errorHandler = new ErrorHandler();
export default errorHandler;
