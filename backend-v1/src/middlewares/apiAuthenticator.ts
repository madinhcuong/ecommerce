import { NextFunction, Request, Response } from "express";
import { env } from "../config";
import { responseError, FORBIDDEN } from "../helpers";

export const apiAuthenticator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (env.apiKey === req.headers.api_key) {
    return next();
  }
  return responseError(res, FORBIDDEN, "FORBIDDEN", { error: "Forbidden" });
};
