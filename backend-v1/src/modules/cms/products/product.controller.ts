import { Request, Response } from "express";
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

const createProduct = async (req: Request, res: Response) => {
  try {
    let body = req.body;
    return responseOk(res, body);
  } catch (err: any) {
    console.log("err.message", err.message);
    return responseError(res, INTERNAL_SERVER_ERROR, "ERROR", err.message);
  }
};

export { getProducts, createProduct };
