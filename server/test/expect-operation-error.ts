import { HttpStatusCode } from "../common/http-status-code";
import {
  OperationErrorMessage,
  OperationError,
} from "../common/operation-error";

export function expectOperationError(
  err: Error,
  message: OperationErrorMessage,
  status: HttpStatusCode
) {
  if (err instanceof OperationError) {
    if (message !== err.message) {
      throw new Error(
        `expected operation error message to be ${message}, got ${err.message}`
      );
    }

    if (status !== err.status) {
      throw new Error(
        `expected operation error status to be ${status}, got ${err.status}`
      );
    }

    return;
  }

  throw new Error("expected error to be instance of OperationError");
}
