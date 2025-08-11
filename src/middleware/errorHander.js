// src/middleware/error-handler.js
const AppError = require("../utils/AppError")


const ErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";


  // CastError - Invalid ObjectId
  if (err.name === "CastError") {
    err = new AppError(`Resource not found. Invalid: ${err.path}`, 400);
  }
  if (err.name === "MongoServerError") {
    err = new AppError(
      `E11000 duplicate key error collection: ${err.path}`,
      400
    );
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ");
    err = new AppError(`Duplicate value entered for ${field}`, 400);
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    err = new AppError("Invalid token. Please login again.", 401);
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    err = new AppError("Token has expired. Please login again.", 401);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    err = new AppError(messages.join(", "), 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports = ErrorHandler;
