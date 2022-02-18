import express from "express";
import ContactController from "./contact.controller";

// route
const router = express.Router();

router
  .route("/contact")
  .get(ContactController.getListContact)
  .post(ContactController.createContact);

export default router;
