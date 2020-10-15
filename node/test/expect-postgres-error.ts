import { PostgresError } from "../database/postgres/postgres-error";
import { PostgresErrorCode } from "../database/postgres/postgres-error-codes";

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
