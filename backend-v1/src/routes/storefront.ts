import express from "express";
const router = express.Router();

import Contact from "../modules/storefront/contacts/contact.router";
import ChatBot from "../modules/storefront/chatBot/chatBot.router";

router.use("/", [Contact, ChatBot]);

export default router;
