import { Document } from "mongoose";

export interface IExperience extends Document {
  company: string;
  title: string;
  description: string;
  startingDate: Date;
  endingDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExperienceDto {
  company: string;
  title: string;
  description: string;
  startingDate: Date;
  endingDate: Date;
}

export interface UpdateExperienceDto extends Partial<CreateExperienceDto> {}
