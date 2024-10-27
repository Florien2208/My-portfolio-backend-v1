// src/types/contact.types.ts
import { Request, Response } from "express";

export interface ContactRequest extends Request {
  body: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}
