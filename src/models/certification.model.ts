// src/models/Certification.ts
import mongoose from "mongoose";

export interface ICertification extends mongoose.Document {
  title: string;
  year: string;
  type: "certification" | "award" | "course";
  highlight?: boolean;
  description?: string;
  skills?: string[];
  issuer?: string;
}

const CertificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: String, required: true },
    type: {
      type: String,
      enum: ["certification", "award", "course"],
      required: true,
    },
    highlight: { type: Boolean, default: false },
    description: { type: String },
    skills: [{ type: String }],
    issuer: { type: String },
  },
  { timestamps: true }
);

export const Certification = mongoose.model<ICertification>(
  "Certification",
  CertificationSchema
);
