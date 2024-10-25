import { Schema, model } from "mongoose";
import { IExperience } from "./types/experience.types";


const experienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startingDate: { type: Date, required: true },
    endingDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const Experience = model<IExperience>("My-Experience", experienceSchema);
