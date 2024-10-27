import { Router } from "express";
import { ReferenceController } from "../controllers/reference.controller";

const router = Router();
const referenceController = new ReferenceController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reference:
 *       type: object
 *       required:
 *         - title
 *         - name
 *         - description
 *         - profile
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the reference
 *           example: "507f1f77bcf86cd799439011"
 *         title:
 *           type: string
 *           description: The title of the reference
 *           example: "Senior Developer"
 *         name:
 *           type: string
 *           description: The name of the reference person
 *           example: "John Doe"
 *         description:
 *           type: string
 *           description: Detailed description of the reference
 *           example: "Worked together on multiple projects"
 *         profile:
 *           type: string
 *           description: Profile information or link
 *           example: "linkedin.com/in/johndoe"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the reference was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the reference was last updated
 *
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "error"
 *         message:
 *           type: string
 *           example: "Reference not found"
 */

/**
 * @swagger
 * tags:
 *   name: References
 *   description: API for managing references
 */

/**
 * @swagger
 * /api/references:
 *   post:
 *     summary: Create a new reference
 *     tags: [References]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - name
 *               - description
 *               - profile
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Senior Developer"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               description:
 *                 type: string
 *                 example: "Worked together on multiple projects"
 *               profile:
 *                 type: string
 *                 example: "linkedin.com/in/johndoe"
 *     responses:
 *       201:
 *         description: Reference created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Reference'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", (req, res, next) =>
  referenceController.createReference(req, res, next)
);

/**
 * @swagger
 * /api/references:
 *   get:
 *     summary: Get all references
 *     tags: [References]
 *     responses:
 *       200:
 *         description: List of all references
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reference'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", (req, res, next) =>
  referenceController.getAllReferences(req, res, next)
);

/**
 * @swagger
 * /api/references/{id}:
 *   get:
 *     summary: Get a reference by ID
 *     tags: [References]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reference ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Reference found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Reference'
 *       404:
 *         description: Reference not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", (req, res, next) =>
  referenceController.getReferenceById(req, res, next)
);

/**
 * @swagger
 * /api/references/{id}:
 *   put:
 *     summary: Update a reference
 *     tags: [References]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reference ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Lead Developer"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               profile:
 *                 type: string
 *                 example: "linkedin.com/in/johndoe"
 *     responses:
 *       200:
 *         description: Reference updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Reference'
 *       404:
 *         description: Reference not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", (req, res, next) =>
  referenceController.updateReference(req, res, next)
);

/**
 * @swagger
 * /api/references/{id}:
 *   delete:
 *     summary: Delete a reference
 *     tags: [References]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reference ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       204:
 *         description: Reference deleted successfully
 *       404:
 *         description: Reference not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", (req, res, next) =>
  referenceController.deleteReference(req, res, next)
);

export default router;
