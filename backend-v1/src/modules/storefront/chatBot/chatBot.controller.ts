import { Request, Response } from "express";
import { env } from "../../../config";
import {
  responseOk,
  responseError,
  INTERNAL_SERVER_ERROR,
} from "../../../helpers";
import BotService from "./chatBot.service";

class BotController {
  static async getCovid19Infor(req: Request, res: Response) {
    try {
      const data = await BotService.getCovid19Infor();
      return responseOk(res, data);
    } catch (err: any) {
      console.log("err.message", err.message);
      return responseError(res, INTERNAL_SERVER_ERROR, "ERROR", err.message);
    }
  }

  static async verifyWebhook(req: Request, res: Response) {
    try {
      let mode = req.query["hub.mode"];
      let token = req.query["hub.verify_token"];
      let challenge = req.query["hub.challenge"];

      console.log("env.verifyTokenFb", env.verifyTokenFb);

      if (mode && token) {
        if (mode === "subscribe" && token === env.verifyTokenFb) {
          return res.status(200).send(challenge);
        }

        return res.sendStatus(403);
      }
      return responseOk(res, "Success");
    } catch (err: any) {
      console.log("err.message", err.message);
      return responseError(res, INTERNAL_SERVER_ERROR, "ERROR", err.message);
    }
  }

  static async handleWebhook(req: Request, res: Response) {
    try {
      const {} = req.body;
      if (req.body.object === "page") {
        req.body.entry.forEach(async function (entry: any) {
          var messaging = entry.messaging;

          console.log("messaging", messaging);

          for (var message of messaging) {
            var senderId = message.sender.id;

            console.log("senderId", senderId);

            if (message.message && message.message.text) {
              // Nếu người dùng gửi tin nhắn đến
              var text = message.message.text.trim();

              console.log("text", text);

              await BotService.sendMessage(senderId, text);
            }
          }
        });

        return res.status(200).send("EVENT_RECEIVED");
      }

      return responseOk(res, "data");
    } catch (err: any) {
      console.log("err.message", err.message);
      return responseError(res, INTERNAL_SERVER_ERROR, "ERROR", err.message);
    }
  }
}

export default BotController;
