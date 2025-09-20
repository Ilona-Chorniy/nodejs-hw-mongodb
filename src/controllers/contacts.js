import createHttpError from 'http-errors';
import {
  fetchContacts,
  findContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export const getAllContacts = async (req, res) => {
  const contacts = await fetchContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await findContactById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const { name, phoneNumber, contactType } = req.body;
  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'Missing required fields: name, phoneNumber, contactType',
    );
  }
  const newContact = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const patchContact = async (req, res) => {
  const contactId = req.params.contactId;
  const updateData = req.body;
  const updatedContact = await updateContact(contactId, updateData);
  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const removeContact = async (req, res) => {
  const contactId = req.params.contactId;
  const deletedContact = await deleteContact(contactId);
  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};
