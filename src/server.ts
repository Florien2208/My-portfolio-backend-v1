import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoute.route";
import { errorHandler } from "./middleware/errorMiddleware";
import { AppError } from "./utils/AppError";
import authRoutes from "./routes/auth.route";
import { experienceRoutes } from "./routes/experience.route";



dotenv.config();

const app: Express = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// MongoDB connection
app.use("/api/users", userRoutes);
// Handle undefined routes
app.use("/api/experiences", experienceRoutes);

app.use("/api/auth", authRoutes);
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, 'fail', `Can't find ${req.originalUrl} on this server!`));
});

// Global error handling middleware
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/MY-PORTFOLIO")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to TypeScript Express API" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`
  );
});
