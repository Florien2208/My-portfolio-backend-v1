import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import mongoose from "mongoose";

// Interface for MongoDB errors
interface MongoError extends Error {
  code?: number;
  keyPattern?: { [key: string]: number };
  keyValue?: { [key: string]: string };
}

interface ErrorResponse {
  status: string;
  message: string;
  stack?: string;
  errors?: any;
}

const handleCastErrorDB = (err: mongoose.Error.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(400, "fail", message);
};

const handleDuplicateFieldsDB = (err: MongoError) => {
  let value = "field";

  // Get the duplicate field value from keyValue if available
  if (err.keyValue) {
    value = Object.values(err.keyValue)[0];
  } else {
    // Fallback to regex matching if keyValue is not available
    const match = err.message.match(/(["'])(\\?.)*?\1/);
    value = match ? match[0] : "field";
  }

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(400, "fail", message);
};

const handleValidationErrorDB = (err: mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(400, "fail", message);
};

const handleJWTError = () =>
  new AppError(401, "fail", "Invalid token. Please log in again!");

const handleJWTExpiredError = () =>
  new AppError(401, "fail", "Your token has expired! Please log in again.");

const sendErrorDev = (err: AppError, res: Response) => {
  const response: ErrorResponse = {
    status: err.status,
    message: err.message,
    stack: err.stack,
  };

  if (err instanceof mongoose.Error.ValidationError) {
    response.errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  res.status(err.statusCode).json(response);
};

const sendErrorProd = (err: AppError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown error: don't leak error details
  else {
    // Log error for debugging
    console.error("ERROR 💥", err);

    // Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

export const errorHandler = (
  err: Error | MongoError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error =
    err instanceof AppError ? err : new AppError(500, "error", err.message);

  if (err instanceof mongoose.Error.CastError) error = handleCastErrorDB(err);
  if ((err as MongoError).code === 11000)
    error = handleDuplicateFieldsDB(err as MongoError);
  if (err instanceof mongoose.Error.ValidationError)
    error = handleValidationErrorDB(err);
  if (err.name === "JsonWebTokenError") error = handleJWTError();
  if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};
