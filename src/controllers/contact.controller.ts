import { Request, Response, NextFunction } from "express";
import { Contact } from "../models/contact.model";
import { ContactRequest } from "../models/types/contact.types";
// import { ContactRequest } from "../types/contact.types";

export class ContactController {
  static async createContact(
    req: ContactRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const newContact = await Contact.create(req.body);
      res.status(201).json({
        success: true,
        data: newContact,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getAllContacts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getContact(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const contact = await Contact.findById(req.params.id);

      if (!contact) {
        res.status(404).json({
          success: false,
          message: "Contact not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: contact,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
