import { ApiError } from "../api-error";
import { HttpStatusCode } from "../http-status-code";
import { validateInteger } from "./validate-integer";

export const validatePageParameter = (page: number) => {
  validateInteger("page", page);
  if (page < 1) {
    throw new ApiError(
      `invalid page value ${page}; must be positive integer`,
      HttpStatusCode.BAD_REQUEST
    );
  }

  return page;
};
