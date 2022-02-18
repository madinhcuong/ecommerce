import { Request, Response } from "express";
import axios from "axios";
import {
  responseOk,
  responseError,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from "../../../helpers";

const getProducts = async (req: Request, res: Response) => {
  try {
    return responseOk(res, "data");
  } catch (err: any) {
    console.log("err.message", err.message);
    return responseError(res, INTERNAL_SERVER_ERROR, "ERROR", err.message);
  }
};

export { getProducts };
