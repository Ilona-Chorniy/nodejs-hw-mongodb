import { Contact } from '../models/contact.js';
import createHttpError from 'http-errors';

export const fetchContacts = (userId) => {
  return Contact.find({ userId });
};

export const findContactById = async (id, userId) => {
  const contact = await Contact.findOne({ _id: id, userId });
  if (!contact) throw createHttpError(404, 'Contact not found');
  return contact;
};

export const addContact = async (data, userId) => {
  return Contact.create({ ...data, userId });
};

export const updateContact = async (id, data, userId) => {
  const contact = await Contact.findOneAndUpdate({ _id: id, userId }, data, { new: true });
  if (!contact) throw createHttpError(404, 'Contact not found');
  return contact;
};

export const deleteContact = async (id, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: id, userId });
  if (!contact) throw createHttpError(404, 'Contact not found');
  return contact;
};
