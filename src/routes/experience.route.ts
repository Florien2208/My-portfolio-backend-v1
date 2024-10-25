import { Router } from "express";
import { ExperienceController } from "../controllers/experience.controller";

const router = Router();
const experienceController = new ExperienceController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Experience:
 *       type: object
 *       required:
 *         - company
 *         - title
 *         - description
 *         - startingDate
 *         - endingDate
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         company:
 *           type: string
 *           description: Company name
 *         title:
 *           type: string
 *           description: Job title
 *         description:
 *           type: string
 *           description: Job description
 *         startingDate:
 *           type: string
 *           format: date
 *           description: Start date of the experience
 *         endingDate:
 *           type: string
 *           format: date
 *           description: End date of the experience
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the record was last updated
 *     ExperienceInput:
 *       type: object
 *       required:
 *         - company
 *         - title
 *         - description
 *         - startingDate
 *         - endingDate
 *       properties:
 *         company:
 *           type: string
 *           description: Company name
 *         title:
 *           type: string
 *           description: Job title
 *         description:
 *           type: string
 *           description: Job description
 *         startingDate:
 *           type: string
 *           format: date
 *           description: Start date of the experience
 *         endingDate:
 *           type: string
 *           format: date
 *           description: End date of the experience
 *   responses:
 *     NotFound:
 *       description: The specified resource was not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Experience not found
 */

/**
 * @swagger
 * /api/experiences:
 *   post:
 *     summary: Create a new experience
 *     tags: [Experiences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExperienceInput'
 *     responses:
 *       201:
 *         description: The experience was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experience'
 *       400:
 *         description: Invalid input data
 */
router.post("/", experienceController.createExperience);

/**
 * @swagger
 * /api/experiences:
 *   get:
 *     summary: Retrieve all experiences
 *     tags: [Experiences]
 *     responses:
 *       200:
 *         description: List of all experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Experience'
 *       500:
 *         description: Server error
 */
router.get("/", experienceController.getAllExperiences);

/**
 * @swagger
 * /api/experiences/{id}:
 *   get:
 *     summary: Get experience by ID
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Experience ID
 *     responses:
 *       200:
 *         description: Experience details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experience'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Server error
 */
router.get("/:id", experienceController.getExperienceById);

/**
 * @swagger
 * /api/experiences/{id}:
 *   put:
 *     summary: Update an experience
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Experience ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExperienceInput'
 *     responses:
 *       200:
 *         description: The experience was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experience'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       400:
 *         description: Invalid input data
 */
router.put("/:id", experienceController.updateExperience);

/**
 * @swagger
 * /api/experiences/{id}:
 *   delete:
 *     summary: Delete an experience
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Experience ID
 *     responses:
 *       200:
 *         description: Experience deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Experience deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         description: Server error
 */
router.delete("/:id", experienceController.deleteExperience);

export const experienceRoutes = router;
