import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";
import { auth } from "../utils/auth.js";
import { AppError } from "./errorHandler.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      throw new AppError("Not authenticated", 401);
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role || "user",
    };

    next();
  } catch (error) {
    next(error);
  }
};
