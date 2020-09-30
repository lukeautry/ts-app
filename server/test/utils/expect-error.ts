import { ApiError } from "../../utils/api-error";
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

export function expectAPIError(err: Error): asserts err is ApiError {
  if (err instanceof ApiError) {
    return;
  }

  throw new Error(`expected error to be instance of ApiError`);
}
