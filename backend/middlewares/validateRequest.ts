import { Request, Response, NextFunction } from "express";
import { ValidationError, validationResult } from "express-validator";

/**
 * Centralized middleware to check for validation errors after running express-validator checks.
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({
      // Added return here for consistency
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => {
        // 'err' is of type ValidationError, which now has a 'path' property for the field name
        // or a 'type' property to distinguish between different error types.
        // For 'field' errors, 'path' will contain the field name.
        if (err.type === "field") {
          return {
            field: err.path, // Use err.path for the field name
            message: err.msg,
          };
        }
        // Handle other types of errors if necessary (e.g., unknown fields, etc.)
        return {
          field: "unknown", // Or some other default/indicator
          message: err.msg,
        };
      }),
    });
    return;
  }

  // No validation errors — proceed to next middleware or controller
  next();
};
