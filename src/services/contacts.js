import { Contact } from '../models/contact.js';

export const fetchContacts = async () => {
  return Contact.find();
};

export const findContactById = async (id) => {
  return Contact.findById(id);
};

export const addContact = async (data) => {
  return Contact.create(data);
};

export const updateContact = async (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

export const deleteContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};
