import { ApiError } from "../api-error";
import { HttpStatusCode } from "../http-status-code";
import { validateInteger } from "./validate-integer";

export const validatePageSizeParameter = (pageSize: number) => {
  validateInteger("page_size", pageSize);
  if (pageSize < 1) {
    throw new ApiError(
      `invalid page_size value ${pageSize}; must be positive integer`,
      HttpStatusCode.BAD_REQUEST
    );
  }
};
