// middleware/auth.middleware.ts

import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { AppError } from "../utils/AppError";
import { IAuthRequest, IDecodedToken } from "../models/auth.model";
// import { IAuthRequest, IDecodedToken } from "../interfaces/auth.interface";

export const authMiddleware = {
  protect: async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      // 1) Get token and check if it exists
      let token: string | undefined;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return next(
          new AppError(
            401,
            "fail",
            "You are not logged in! Please log in to get access"
          )
        );
      }

      // 2) Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "mahendra_kudabakchi"
      ) as IDecodedToken;

      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(
          new AppError(
            401,
            "fail",
            "The user belonging to this token no longer exists"
          )
        );
      }

      // Grant access to protected route
      req.user = currentUser;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        next(new AppError(401, "fail", "Invalid token. Please log in again!"));
      } else {
        next(error);
      }
    }
  },

  restrictTo: (...roles: string[]) => {
    return (req: IAuthRequest, res: Response, next: NextFunction) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return next(
          new AppError(
            403,
            "fail",
            "You do not have permission to perform this action"
          )
        );
      }
      next();
    };
  },
};
