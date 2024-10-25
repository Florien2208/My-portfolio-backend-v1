import { Request, Response } from "express";
import { ExperienceService } from "./services/experience.service";


export class ExperienceController {
  private experienceService: ExperienceService;

  constructor() {
    this.experienceService = new ExperienceService();
  }

  createExperience = async (req: Request, res: Response): Promise<void> => {
    try {
      const experience = await this.experienceService.createExperience(
        req.body
      );
      res.status(201).json(experience);
    } catch (error) {
      res.status(400).json({ message: "Error creating experience", error });
    }
  };

  getAllExperiences = async (_req: Request, res: Response): Promise<void> => {
    try {
      const experiences = await this.experienceService.getAllExperiences();
      res
        .status(200)
        .json({
          message: "Experiences fetched successfully",
          result: experiences.length,
          data: experiences,
        });
    } catch (error) {
      res.status(500).json({ message: "Error fetching experiences", error });
    }
  };

  getExperienceById = async (req: Request, res: Response): Promise<void> => {
    try {
      const experience = await this.experienceService.getExperienceById(
        req.params.id
      );
      if (!experience) {
        res.status(404).json({ message: "Experience not found" });
        return;
      }
      res.status(200).json(experience);
    } catch (error) {
      res.status(500).json({ message: "Error fetching experience", error });
    }
  };

  updateExperience = async (req: Request, res: Response): Promise<void> => {
    try {
      const experience = await this.experienceService.updateExperience(
        req.params.id,
        req.body
      );
      if (!experience) {
        res.status(404).json({ message: "Experience not found" });
        return;
      }
      res.status(200).json(experience);
    } catch (error) {
      res.status(400).json({ message: "Error updating experience", error });
    }
  };

  deleteExperience = async (req: Request, res: Response): Promise<void> => {
    try {
      const experience = await this.experienceService.deleteExperience(
        req.params.id
      );
      if (!experience) {
        res.status(404).json({ message: "Experience not found" });
        return;
      }
      res.status(200).json({ message: "Experience deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting experience", error });
    }
  };
}
