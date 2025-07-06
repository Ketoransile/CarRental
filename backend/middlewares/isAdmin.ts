import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../utils/auth";
import { NextFunction, Request, Response } from "express";
import { AppError } from "./errorHandler.js";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      throw new AppError("Authentication required.", 401);
    }

    const adminUser = session.user.role === "admin";
    if (!adminUser) {
      throw new AppError("You are not authorized to perform this action.", 403);
    }

    // console.log("Session from isAdmin middleware function is", session);

    next();
  } catch (error) {
    next(error);
  }
};
