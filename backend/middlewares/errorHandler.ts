// src/middlewares/errorHandler.js
import "dotenv/config";
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the full error stack in development

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong on the server.";

  // Mongoose specific errors
  if (err.name === "CastError" && err.kind === "ObjectId") {
    const statusCode = 404;
    const message = `Resource not found with ID of ${err.value}`;
  }
  if (err.code === 11000) {
    // Duplicate key error
    const statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value: ${field} already exists.`;
  }
  if (err.name === "ValidationError") {
    // Mongoose validation errors
    const statusCode = 400;
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    // Only send error details in development mode
    error:
      process.env.NODE_ENV === "production"
        ? {}
        : {
            message: err.message,
            stack: err.stack,
          },
  });
};

export default errorHandler;
