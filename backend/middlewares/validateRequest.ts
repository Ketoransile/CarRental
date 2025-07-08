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
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => {
        const e = err as ValidationError;
        return {
          field: e.param,
          message: e.msg,
        };
      }),
    });
    return;
  }

  // No validation errors — proceed to next middleware or controller
  next();
};
