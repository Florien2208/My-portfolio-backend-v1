// src/types/certification.ts
export interface Certification {
  id?: number;
  title: string;
  year: string;
  type: "certification" | "award" | "course";
  highlight?: boolean;
  description?: string;
  skills?: string[];
  issuer?: string;
}
