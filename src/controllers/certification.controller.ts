// src/controllers/certificationController.ts
import { Request, Response } from "express";
import { Certification } from "../models/certification.model";


export class CertificationController {
  static async getAllCertifications(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const certifications = await Certification.find().sort({ year: -1 });
      res.json(certifications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching certifications", error });
    }
  }

  static async createCertification(req: Request, res: Response): Promise<void> {
    try {
      const certification = new Certification(req.body);
      const newCertification = await certification.save();
      res.status(201).json(newCertification);
    } catch (error) {
      res.status(400).json({ message: "Error creating certification", error });
    }
  }

  static async updateCertification(req: Request, res: Response): Promise<void> {
    try {
      const certification = await Certification.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!certification) {
        res.status(404).json({ message: "Certification not found" });
        return;
      }
      res.json(certification);
    } catch (error) {
      res.status(400).json({ message: "Error updating certification", error });
    }
  }

  static async deleteCertification(req: Request, res: Response): Promise<void> {
    try {
      const certification = await Certification.findByIdAndDelete(
        req.params.id
      );
      if (!certification) {
        res.status(404).json({ message: "Certification not found" });
        return;
      }
      res.json({ message: "Certification deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting certification", error });
    }
  }
}
