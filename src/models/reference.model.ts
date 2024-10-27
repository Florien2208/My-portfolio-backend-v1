import { Schema, model, Document } from "mongoose";
import { IReference } from "./types/reference.types";


export interface IReferenceDocument extends IReference, Document {}

const referenceSchema = new Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    profile: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Reference = model<IReferenceDocument>(
  "My-References",
  referenceSchema
);
