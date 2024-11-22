import express from "express";
import { CertificationController } from "../controllers/certification.controller";


const router = express.Router();

router.get("/", CertificationController.getAllCertifications);
router.post("/", CertificationController.createCertification);
router.put("/:id", CertificationController.updateCertification);
router.delete("/:id", CertificationController.deleteCertification);



export default router;
