import { Request, Response } from "express";
import Contact from "../models/contact.model";

// Create a new contact submission
export const createContact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    return res
      .status(201)
      .json({ message: "Contact created successfully", newContact });
  } catch (error) {
    return res.status(500).json({ error: "Error creating contact" });
  }
};

// Get all contacts
export const getContacts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving contacts" });
  }
};

// Get contact by ID
export const getContactById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving contact" });
  }
};

// Update a contact by ID
export const updateContact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, message } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, message },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res
      .status(200)
      .json({ message: "Contact updated successfully", contact });
  } catch (error) {
    return res.status(500).json({ error: "Error updating contact" });
  }
};

// Delete a contact by ID
export const deleteContact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting contact" });
  }
};
