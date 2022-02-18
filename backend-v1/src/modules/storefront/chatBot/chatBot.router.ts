import express from "express";
import BotController from "./chatBot.controller";

// route
const router = express.Router();

router.route("/covid19-infor").get(BotController.getCovid19Infor);

router
  .route("/webhook")
  .get(BotController.verifyWebhook)
  .post(BotController.handleWebhook);

export default router;
