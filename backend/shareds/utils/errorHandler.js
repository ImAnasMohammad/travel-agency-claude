/*
 *  FileName:-     errorHandler.js
 *  Description:-  Global error handler middleware and custom AppError class
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const logger = require("./logger");
const { HTTP_STATUS } = require("../constants/appConstants");

/*
 *  functionName:- AppError
 *  Description:-  Custom application error class with status code and operational flag
 *  Arguments:-    message - string, statusCode - number, isOperational - boolean
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
class AppError extends Error {
  constructor(message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/*
 *  functionName:- handleCastError
 *  Description:-  Handles Mongoose CastError (invalid ObjectId)
 *  Arguments:-    err - Mongoose error object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, HTTP_STATUS.BAD_REQUEST);
};

/*
 *  functionName:- handleDuplicateFieldsError
 *  Description:-  Handles MongoDB duplicate key error (code 11000)
 *  Arguments:-    err - MongoDB error object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const handleDuplicateFieldsError = (err) => {
  const field = Object.keys(err.keyValue || {})[0] || "field";
  const value = err.keyValue ? err.keyValue[field] : "unknown";
  const message = `Duplicate value for ${field}: "${value}". Please use a different value.`;
  return new AppError(message, HTTP_STATUS.CONFLICT);
};

/*
 *  functionName:- handleValidationError
 *  Description:-  Handles Mongoose ValidationError
 *  Arguments:-    err - Mongoose validation error object
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Validation error: ${errors.join(". ")}`;
  return new AppError(message, HTTP_STATUS.UNPROCESSABLE);
};

/*
 *  functionName:- handleJWTError
 *  Description:-  Handles invalid JWT token error
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", HTTP_STATUS.UNAUTHORIZED);

/*
 *  functionName:- handleJWTExpiredError
 *  Description:-  Handles expired JWT token error
 *  Arguments:-    none
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again.", HTTP_STATUS.UNAUTHORIZED);

/*
 *  functionName:- sendErrorDev
 *  Description:-  Sends detailed error response for development environment
 *  Arguments:-    err - error object, res - Express response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack,
    timestamp: new Date().toISOString(),
  });
};

/*
 *  functionName:- sendErrorProd
 *  Description:-  Sends safe error response for production environment
 *  Arguments:-    err - error object, res - Express response
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      timestamp: new Date().toISOString(),
    });
  }
  logger.error("Non-operational error:", err);
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went very wrong. Please try again later.",
    timestamp: new Date().toISOString(),
  });
};

/*
 *  functionName:- globalErrorHandler
 *  Description:-  Express global error handling middleware - handles all error types
 *  Arguments:-    err - error, req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  err.message = err.message || "Internal Server Error";

  logger.error({
    message: err.message,
    statusCode: err.statusCode,
    path: req.path,
    method: req.method,
    ip: req.ip,
    stack: err.stack,
  });

  const isDev = process.env.NODE_ENV === "development";

  let error = Object.assign(Object.create(Object.getPrototypeOf(err)), err);
  error.message = err.message;
  error.stack = err.stack;

  if (error.name === "CastError") error = handleCastError(error);
  if (error.code === 11000) error = handleDuplicateFieldsError(error);
  if (error.name === "ValidationError") error = handleValidationError(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

  if (isDev) {
    return sendErrorDev(error, res);
  }
  return sendErrorProd(error, res);
};

/*
 *  functionName:- notFoundHandler
 *  Description:-  Handles 404 - Route not found
 *  Arguments:-    req - Request, res - Response, next - NextFunction
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const notFoundHandler = (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, HTTP_STATUS.NOT_FOUND));
};

/*
 *  functionName:- asyncWrapper
 *  Description:-  Wraps async route handlers to catch promise rejections
 *  Arguments:-    fn - async function
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */
const asyncWrapper = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  AppError,
  globalErrorHandler,
  notFoundHandler,
  asyncWrapper,
};
