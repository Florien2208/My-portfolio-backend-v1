import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

export interface IUser extends Document {
  name: string;
  email: string;
  location: string;
  role: "user" | "admin" | "moderator";
  photo: string;
  password: string; // Changed from string | undefined to just string
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  location: {
    type: String,
    required: [true, "Please provide your location"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false, // Don't include password in queries by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only run if password is modified
  if (!this.isModified("password")) return next();

  // Type assertion to ensure password is string
  const password = this.password as string;

  // Hash password with cost of 12
  this.password = await bcrypt.hash(password, 12);
  next();
});

// Instance method to check if password is correct
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  // Type assertion since password is required in schema
  const password = this.password as string;
  return await bcrypt.compare(candidatePassword, password);
};

export const User = model<IUser>("User", userSchema);
