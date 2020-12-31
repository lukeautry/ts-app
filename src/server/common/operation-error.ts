import { OperationErrorMessage } from "../../common/operation-error-message";
import { HttpStatusCode } from "./http-status-code";

export class OperationError extends Error {
  constructor(
    message: OperationErrorMessage,
    readonly status: HttpStatusCode,
    readonly info?: string
  ) {
    super(message);
  }
}
