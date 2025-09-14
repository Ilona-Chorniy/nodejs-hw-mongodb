import { Contact } from '../models/contact.js';

export const fetchContacts = async () => {
  const allContacts = await Contact.find();
  return allContacts;
};

export const findContactById = async (id) => {
  const result = await Contact.findById(id);
  return result;
};