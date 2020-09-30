import { ApiError } from "../api-error";
import { HttpStatusCode } from "../http-status-code";

export const validateInteger = (name: string, value: number) => {
  if (!Number.isInteger(value)) {
    throw new ApiError(`${name} is not an integer`, HttpStatusCode.BAD_REQUEST);
  }

  return value;
};
