import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";
import { auth } from "../utils/auth";

// Extend Express Request type to include user information
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
    // Get session from better-auth
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    console.log("req from authentictaedUser.ts", req);
    console.log("session from authenticated user is ", session);
    if (!session || !session.user) {
      // **CHANGED: Removed 'return' here**
      res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
      return; // Explicitly return to prevent further execution in this middleware
    }

    // Attach user to request object
    req.user = {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role || "user", // Default role
    };

    console.log("Authenticated user:", req.user);
    next(); // This is the path that allows the request to continue
  } catch (error) {
    console.error("Authentication error:", error);
    // **CHANGED: Removed 'return' here**
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
    return; // Explicitly return to prevent further execution
  }
};

// The requireRole middleware already implicitly handles this correctly
// because it returns the result of res.status().json()
export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        // This 'return' is fine because it's inside a non-async function
        success: false,
        message: `Requires ${role} role`,
      });
    }
    next();
  };
};
