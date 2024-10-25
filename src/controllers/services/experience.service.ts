import { Experience } from "../../models/experience.model";
import { CreateExperienceDto, IExperience, UpdateExperienceDto } from "../../models/types/experience.types";


export class ExperienceService {
  async createExperience(
    createExperienceDto: CreateExperienceDto
  ): Promise<IExperience> {
    const experience = new Experience(createExperienceDto);
    return await experience.save();
  }

  async getAllExperiences(): Promise<IExperience[]> {
    return await Experience.find().sort({ startingDate: -1 });
  }

  async getExperienceById(id: string): Promise<IExperience | null> {
    return await Experience.findById(id);
  }

  async updateExperience(
    id: string,
    updateExperienceDto: UpdateExperienceDto
  ): Promise<IExperience | null> {
    return await Experience.findByIdAndUpdate(id, updateExperienceDto, {
      new: true,
    });
  }

  async deleteExperience(id: string): Promise<IExperience | null> {
    return await Experience.findByIdAndDelete(id);
  }
}
