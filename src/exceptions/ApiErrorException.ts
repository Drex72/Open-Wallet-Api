class ApiErrorException extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(
    message: string,
    statusCode?: number,
    isOperational: boolean = true,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode ?? 500;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiErrorException;
