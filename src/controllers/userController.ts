import { Request, Response, NextFunction } from "express";

import { AppError } from "../utils/AppError";
import { User } from "../models/User.model";

// Wrapper to catch async errors
const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const userController = {
  getAllUsers: catchAsync(async (req: Request, res: Response) => {
    const users = await User.find();

    if (!users.length) {
      throw new AppError(404, "fail", "No users found");
    }

    res.status(200).json({
      status: "success",
      data: users,
    });
  }),

  createUser: catchAsync(async (req: Request, res: Response) => {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      data: user,
    });
  }),

  getUser: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.findById(req.params.id);

      if (!user) {
        throw new AppError(404, "fail", "No user found with that ID");
      }

      res.status(200).json({
        status: "success",
        data: user,
      });
    }
  ),

  updateUser: catchAsync(async (req: Request, res: Response) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new AppError(404, "fail", "No user found with that ID");
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  }),

  deleteUser: catchAsync(async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      throw new AppError(404, "fail", "No user found with that ID");
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }),
};
