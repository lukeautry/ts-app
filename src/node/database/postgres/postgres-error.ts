import { QueryFailedError } from "typeorm";
import { PostgresErrorCode } from "./postgres-error-codes";

interface PostgresQueryFailedError extends QueryFailedError {
  constraint: string;
}

export class PostgresError extends Error {
  public readonly code: PostgresErrorCode;

  constructor(
    message: string,
    public readonly queryError: PostgresQueryFailedError
  ) {
    super(message);
    this.code = ((queryError as unknown) as { code: PostgresErrorCode }).code;
  }
}
