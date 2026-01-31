import { Request, Response, NextFunction } from "express";
import { connectDB } from "../config/db.js";
import { auth } from "../utils/auth.js";
import { AppError } from "../middlewares/errorHandler.js";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // await connectDB();
    console.log("req ", req);
    if (!req.body) {
      throw new AppError("Empyt request", 400);
    }
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400); // 👈 Use AppError
    }

    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    console.log("login response is ", response);

    if (!response) {
      throw new AppError("Invalid credentials", 401); // 👈 Use AppError
    }

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: response,
    });
  } catch (error) {
    next(error); // 👈 Pass all errors to errorHandler
  }
};
