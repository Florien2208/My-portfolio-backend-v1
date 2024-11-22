import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./UserRoute.route";
import authRoutes from "./auth.route";
import { experienceRoutes } from "./experience.route";
import referenceRoutes from "./reference.route";
import contactRoutes from "./contact.route";
import router from "./certification.route";


const apiRouter = express.Router();

apiRouter.use("/users", userRoutes);
apiRouter.use("/experiences", experienceRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/references", referenceRoutes);
apiRouter.use("/contacts", contactRoutes);
apiRouter.use("/certifications", router);


/**
 * @openapi
 * components:
 *   schemas:
 *     Certification:
 *       type: object
 *       required:
 *         - title
 *         - year
 *         - type
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the certification
 *         year:
 *           type: string
 *           description: Year of certification
 *         type:
 *           type: string
 *           enum: ['certification', 'award', 'course']
 *         highlight:
 *           type: boolean
 *           default: false
 *         description:
 *           type: string
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *         issuer:
 *           type: string
 */

/**
 * @openapi
 * /api/certifications:
 *   get:
 *     summary: Retrieve all certifications
 *     tags: [Certifications]
 *     responses:
 *       200:
 *         description: List of certifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certification'
 */

/**
 * @openapi
 * /api/certifications:
 *   post:
 *     summary: Create a new certification
 *     tags: [Certifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       201:
 *         description: Certification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certification'
 */

/**
 * @openapi
 * /api/certifications/{id}:
 *   put:
 *     summary: Update an existing certification
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       200:
 *         description: Certification updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certification'
 */

/**
 * @openapi
 * /api/certifications/{id}:
 *   delete:
 *     summary: Delete a certification
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certification deleted successfully
 */



export default apiRouter;
