// controller.ts
import { Request, Response, NextFunction } from "express";
import { ReferenceService } from "./services/reference.service";
// import { ReferenceService } from "./service";
// import { AppError } from "./error/AppError";

export class ReferenceController {
  private referenceService: ReferenceService;

  constructor() {
    this.referenceService = new ReferenceService();
  }

  // Create a new reference
  async createReference(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reference = await this.referenceService.create(req.body);
      res.status(201).json({
        status: "success",
        data: reference,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all references
  async getAllReferences(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const references = await this.referenceService.getAll();
      res.status(200).json({
        status: "success",
        data: references,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get a single reference
  async getReferenceById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reference = await this.referenceService.getById(req.params.id);
      res.status(200).json({
        status: "success",
        data: reference,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update a reference
  async updateReference(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reference = await this.referenceService.update(
        req.params.id,
        req.body
      );
      res.status(200).json({
        status: "success",
        data: reference,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete a reference
  async deleteReference(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.referenceService.delete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}
