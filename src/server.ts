import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import dotenv from "dotenv";

import { errorHandler } from "./middleware/errorMiddleware";
import { AppError } from "./utils/AppError";

import cors from "cors";
import apiRouter from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ;
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:9000",
      "https://my-portfolio-backend-v1.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Middleware
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send(
    `Welcome to Florien Portfolio Backend v1 API Swagger documentation available at:  <a href="https://my-portfolio-backend-v1.onrender.com/api-docs " target="_blank">Docs</a>`
  );
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// MongoDB connection
app.use("/api", apiRouter);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(404, "fail", `Can't find ${req.originalUrl} on this server!`)
  );
});

// Global error handling middleware
app.use(errorHandler);

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

mongoose
  .connect(process.env.MONGODB_URI )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Basic route

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`
  );
});
