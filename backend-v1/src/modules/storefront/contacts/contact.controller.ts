import { Request, Response } from "express";
import ContactService from "./contact.service";
import {
  responseOk,
  responseError,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  // getCache,
  // setCache,
  // createES,
  // searchES,
} from "../../../helpers";

class ContactController {
  static async getListContact(req: Request, res: Response) {
    try {
      let data = await ContactService.getData();

      console.log("data", data);

      return responseOk(res, data);
    } catch (err: any) {
      console.log("err.message", err.message);
      return responseError(res, INTERNAL_SERVER_ERROR, "ERROR", err.message);
    }
  }

  static async createContact(req: Request, res: Response) {
    try {
      let { username } = req.body;

      console.log("username", username);

      let data = await ContactService.create(req.body);

      console.log("data", data);

      return responseOk(res, "CREATE_SUCCESS");
    } catch (err: any) {
      console.log("err.message", err.message);
      return responseError(res, INTERNAL_SERVER_ERROR, "ERROR", err.message);
    }
  }
}

export default ContactController;
