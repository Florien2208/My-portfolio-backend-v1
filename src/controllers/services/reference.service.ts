import { IReferenceDocument, Reference } from "../../models/reference.model";
import {
  ICreateReference,
  IUpdateReference,
} from "../../models/types/reference.types";
import { AppError } from "../../utils/AppError";

export class ReferenceService {
  // Create a new reference
  async create(data: ICreateReference): Promise<IReferenceDocument> {
    try {
      const reference = new Reference(data);
      return await reference.save();
    } catch (error: any) {
      throw new AppError(
        400,
        "error",
        `Error creating reference: ${error?.message || "Unknown error"}`
      );
    }
  }

  // Get all references
  async getAll(): Promise<IReferenceDocument[]> {
    try {
      return await Reference.find();
    } catch (error: any) {
      throw new AppError(
        400,
        "error",
        `Error fetching references: ${error?.message || "Unknown error"}`
      );
    }
  }

  // Get a single reference by ID
  async getById(id: string): Promise<IReferenceDocument | null> {
    try {
      const reference = await Reference.findById(id);
      if (!reference) {
        throw new AppError(404, "error", "Reference not found");
      }
      return reference;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        400,
        "error",
        `Error fetching reference: ${error?.message || "Unknown error"}`
      );
    }
  }

  // Update a reference
  async update(
    id: string,
    data: IUpdateReference
  ): Promise<IReferenceDocument> {
    try {
      const reference = await Reference.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
      );

      if (!reference) {
        throw new AppError(404, "error", "Reference not found");
      }
      return reference;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        400,
        "error",
        `Error updating reference: ${error?.message || "Unknown error"}`
      );
    }
  }

  // Delete a reference
  async delete(id: string): Promise<IReferenceDocument> {
    try {
      const reference = await Reference.findByIdAndDelete(id);
      if (!reference) {
        throw new AppError(404, "error", "Reference not found");
      }
      return reference;
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        400,
        "error",
        `Error deleting reference: ${error?.message || "Unknown error"}`
      );
    }
  }
}
