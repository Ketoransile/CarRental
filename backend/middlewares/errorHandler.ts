import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean; // Added for distinguishing AppErrors from programming errors

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // Mark AppErrors as operational errors

    // Capture stack trace for better debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default values for unknown errors
  let statusCode = 500;
  let status = "error";
  let message = "Internal server error";
  let data: any = null; // Optional: for consistent structure, even if null

  if (err instanceof AppError) {
    // If it's an AppError, use its properties
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
    // AppErrors don't typically carry 'data' for errors, but you could add if needed
    // For consistency, we might send an empty object or null for data in error responses
  } else {
    // For programming errors or other unhandled errors
    console.error("UNHANDLED ERROR 💥:", err); // Log full error for debugging

    // In development, send detailed error info; in production, send generic error
    if (process.env.NODE_ENV === "development") {
      message = err.message; // Use the actual error message
      // Optionally include stack in dev for unhandled errors
      // data = { stack: err.stack };
    }
  }

  // Determine 'success' status (false for all errors)
  const success = false;

  res.status(statusCode).json({
    success, // Will be false for all error responses
    status,
    message,
    data, // Will be null unless explicitly set for certain error types
  });
};
