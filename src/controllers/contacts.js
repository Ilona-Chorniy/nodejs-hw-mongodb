import createHttpError from "http-errors";
import {
  fetchContacts,
  findContactById,
  addContact,
  updateContact,
  deleteContact,
} from "../services/contacts.js";

export const getAllContacts = async (req, res) => {
  const userId = req.user._id;
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;
  const sortBy = ["name", "email"].includes(req.query.sortBy) ? req.query.sortBy : "name";
  const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
  const type = req.query.type;
  const isFavourite = req.query.isFavourite === "true" ? true : undefined;
  const skip = (page - 1) * perPage;

  let query = fetchContacts(userId);
  if (type) query = query.where("contactType").equals(type);
  if (isFavourite !== undefined) query = query.where("isFavourite").equals(isFavourite);

  const totalItems = await query.clone().countDocuments();
  const contacts = await query.sort({ [sortBy]: sortOrder }).skip(skip).limit(perPage);

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: {
      data: contacts,
      page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      hasPreviousPage: page > 1,
      hasNextPage: page * perPage < totalItems,
    },
  });
};

export const getContactById = async (req, res) => {
  const contact = await findContactById(req.params.contactId, req.user._id);
  if (!contact) throw createHttpError(404, "Contact not found");
  res.json({ status: 200, message: "Successfully found contact!", data: contact });
};

export const createContact = async (req, res) => {
  if (!req.body.name || !req.body.phoneNumber || !req.body.contactType) {
    throw createHttpError(400, "Missing required fields");
  }
  const newContact = await addContact(req.body, req.user._id);
  res.status(201).json({ status: 201, message: "Contact created!", data: newContact });
};

export const patchContact = async (req, res) => {
  const updatedContact = await updateContact(req.params.contactId, req.body, req.user._id);
  if (!updatedContact) throw createHttpError(404, "Contact not found");
  res.json({ status: 200, message: "Contact updated!", data: updatedContact });
};

export const removeContact = async (req, res) => {
  const deletedContact = await deleteContact(req.params.contactId, req.user._id);
  if (!deletedContact) throw createHttpError(404, "Contact not found");
  res.status(204).send();
};
