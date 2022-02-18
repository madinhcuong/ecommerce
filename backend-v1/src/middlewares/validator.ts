import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { responseError, BAD_REQUEST } from "../helpers";

export const validator = (schema: any) => {
  return async (req: any, res: any, next: Function) => {
    const method = req.method;
    const dataRequest = method === "POST" ? req.body : null;
    if (!dataRequest) next();

    const errors = await validate(plainToClass(schema, dataRequest));
    if (errors.length > 0) {
      const data: any = formatResponseError(errors);
      return responseError(res, BAD_REQUEST, data.message, data.errors);
    }
    next();
  };
};

const formatResponseError = (errors: ValidationError[]) => {
  let data = errors.map((item: any) => {
    const keyConstraint = Object.keys(item.constraints);
    const messages = item.constraints[keyConstraint[0]];
    return {
      field: item.property,
      messages,
    };
  });
  return {
    message: "Validation errors in your request",
    errors: data,
  };
};
