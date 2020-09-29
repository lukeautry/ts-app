import { QueryFailedError } from "typeorm";
import { PostgresErrorCode } from "./postgres-error-codes";

export class PostgresError extends Error {
  public readonly code: PostgresErrorCode;

  constructor(message: string, public readonly queryError: QueryFailedError) {
    super(message);
    this.code = ((queryError as unknown) as { code: PostgresErrorCode }).code;
  }
}
