import { HttpStatusCode } from "./http-status-code";

export type OperationErrorMessage =
  | "UNKNOWN_ERROR"
  | "EMAIL_IN_USE"
  | "NOT_FOUND";

export class OperationError extends Error {
  constructor(message: OperationErrorMessage, readonly status: HttpStatusCode) {
    super(message);
  }
}
