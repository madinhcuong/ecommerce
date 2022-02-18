import { Request, Response } from "express";
import { getUsers } from "./user.service";
import {
  responseOk,
  responseError,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from "../../../helpers";

const getListUsers = async (req: Request, res: Response) => {
  try {
    let data = await getUsers();
    return responseOk(res, data);
  } catch (err: any) {
    console.log("err.message", err.message);
    return responseError(res, INTERNAL_SERVER_ERROR, "ERROR", err.message);
  }
};

export { getListUsers };
