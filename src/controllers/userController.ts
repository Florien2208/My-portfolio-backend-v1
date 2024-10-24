import { Request, Response, NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { AppError } from "../utils/AppError";
import { User } from "../models/User.model";

// Configure multer for file upload
const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "fail", "Please upload only images"));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Wrapper to catch async errors
const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// Ensure upload directory exists
const createUploadDirectoryIfNotExists = () => {
  const uploadDir = path.join(process.cwd(), "public", "img", "users");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  return uploadDir;
};

export const userController = {
  uploadUserPhoto: upload.single("photo"),

  resizeUserPhoto: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file) return next();

      const uploadDir = createUploadDirectoryIfNotExists();

      req.file.filename = `user-${req.params.id || "new"}-${Date.now()}.jpeg`;

      await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(path.join(uploadDir, req.file.filename));

      next();
    }
  ),

  getAllUsers: catchAsync(async (req: Request, res: Response) => {
    const users = await User.find().select("-password");

    if (!users.length) {
      throw new AppError(404, "fail", "No users found");
    }

    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  }),

  createUser: catchAsync(async (req: Request, res: Response) => {
    // Check if user with email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      throw new AppError(400, "fail", "Email already in use");
    }

    // Create new user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      location: req.body.location,
      role: req.body.role || "user",
      password: req.body.password,
      photo: req.file ? req.file.filename : "default.jpg",
    });

    // Remove password from output
    const userWithoutPassword = newUser.toObject();
    
    

    res.status(201).json({
      status: "success",
      data: userWithoutPassword,
    });
  }),

  getUser: catchAsync(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      throw new AppError(404, "fail", "No user found with that ID");
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  }),

  updateUser: catchAsync(async (req: Request, res: Response) => {
    // Prevent password updates on this route
    if (req.body.password || req.body.passwordConfirm) {
      throw new AppError(
        400,
        "fail",
        "This route is not for password updates. Please use /updatePassword"
      );
    }

    // Filter out unwanted fields that should not be updated
    const filteredBody: any = {};
    const allowedFields = ["name", "email", "location", "photo"];
    Object.keys(req.body).forEach((el) => {
      if (allowedFields.includes(el)) filteredBody[el] = req.body[el];
    });

    // Add photo filename to filtered body if file was uploaded
    if (req.file) filteredBody.photo = req.file.filename;

    const user = await User.findByIdAndUpdate(req.params.id, filteredBody, {
      new: true,
      runValidators: true,
    }).select("-password");

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
