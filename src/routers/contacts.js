import { Router } from "express";
import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  removeContact,
} from "../controllers/contacts.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from "../middlewares/isValidId.js";
import validateBody from "../middlewares/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contactsSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", isValidId, ctrlWrapper(getContactById));

router.post(
  "/",
  validateBody(createContactSchema),
  ctrlWrapper(createContact)
);

router.patch(
  "/:contactId",
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(removeContact));

export default router;
