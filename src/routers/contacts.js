import { Router } from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  removeContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', ctrlWrapper(getContactById));
router.post('/', ctrlWrapper(createContact));
router.patch('/:contactId', ctrlWrapper(patchContact));
router.delete('/:contactId', ctrlWrapper(removeContact));

export default router;
