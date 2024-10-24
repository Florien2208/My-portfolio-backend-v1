// controllers/auth.controller.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { AppError } from "../utils/AppError";
import { ILoginBody } from "../models/auth.model";
// import { ILoginBody } from "../interfaces/auth.interface";

// JWT helper functions
const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "mahendra_kudabadchi", {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: ILoginBody = req.body;

      // Check if email and password exist
      if (!email || !password) {
        return next(
          new AppError(400, "fail", "Please provide email and password")
        );
      }

      // Check if user exists && password is correct
      const user = await User.findOne({ email }).select("+password");
console.log("user",user)

      if (!user || !(await user.comparePassword(password))) {
        return next(new AppError(401, "fail", "Incorrect email or password"));
      }

      // If everything is ok, send token to client
      createSendToken(user, 200, res);
    } catch (error) {
      next(error);
    }
  },

  logout: (req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  },

  // Get current user info
  getMe: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById((req as any).user._id);

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
