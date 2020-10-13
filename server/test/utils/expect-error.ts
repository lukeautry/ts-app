import { HttpStatusCode } from "../../common/http-status-code";
import {
  OperationError,
  OperationErrorMessage,
} from "../../common/operation-error";
import { PostgresError } from "../../database/postgres/postgres-error";
import { PostgresErrorCode } from "../../database/postgres/postgres-error-codes";

export const expectError = async (
  fn: () => Promise<unknown>,
  message = "expected error"
): Promise<Error> => {
  try {
    await fn();
  } catch (err) {
    return err;
  }

  throw new Error(message);
};

export function expectPostgresError(
  err: Error,
  code?: PostgresErrorCode
): asserts err is PostgresError {
  if (err instanceof PostgresError) {
    if (code && code !== err.code) {
      throw new Error(`expected error code to be ${code}, got ${err.code}`);
    }

    return;
  }

  throw new Error(`expected error to be instance of PostgresError`);
}

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
