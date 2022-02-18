import { Response } from "express";
import { OK } from "./statusCodes";
import { SUCCESS, ERROR } from "./messages";

export const responseOk = (res: Response, data: any, message?: string) => {
  res.status(OK).send({
    status: OK,
    message: message || SUCCESS,
    data,
  });
};

export const responseError = (
  res: Response,
  status: number,
  message: string,
  error: any,
  errorCode?: number
) => {
  res.status(status).send({
    status: status,
    message: message || ERROR,
    error: error,
    errorCode,
  });
};

export const queryString = (params: any) => {
  let searchParams = [];
  const keys = Object.keys(params);
  for (const key of keys) {
    if (params[key] instanceof Array && params[key].length) {
      for (const index in params[key]) {
        let value = params[key][index];
        searchParams.push(`${key}[${index}]=${value}`);
      }
      delete params[key];
      continue;
    }
    searchParams.push(`${key}=${params[key]}`);
  }
  return searchParams.join("&");
};
