import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./UserRoute.route";
import authRoutes from "./auth.route";
import { experienceRoutes } from "./experience.route";


const apiRouter = express.Router();

apiRouter.use("/users", userRoutes);
apiRouter.use("/experiences", experienceRoutes);
apiRouter.use("/auth", authRoutes);




export default apiRouter;
