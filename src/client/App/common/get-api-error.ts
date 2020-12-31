import { ITryError, error } from "../../../common/try";
import { OperationErrorMessage } from "../../../common/operation-error-message";

const messages: Record<OperationErrorMessage, string> = {
  EMAIL_IN_USE: "Email address is already in use",
  EXPIRED_TOKEN: "The token is expired",
  INVALID_EMAIL: "That isn't a valid email address",
  INVALID_EMAIL_OR_PASSWORD: "Invalid email address or password",
  INVALID_PARAMETERS: "Invalid request",
  INVALID_PASSWORD: "Invalid password",
  INVALID_TOKEN: "Invalid token",
  NOT_FOUND: "Not found",
  UNAUTHORIZED: "Unauthorized",
  UNKNOWN_ERROR: "An unknown error occurred. Please try again.",
};

const isObject = (obj: unknown): obj is {} => !!obj && typeof obj === "object";

const hasKey = <T extends {}, Key extends string>(
  obj: T,
  key: Key
): obj is T & { [K in Key]: unknown } => {
  return key in obj;
};

export const getAPIError = (err: unknown): ITryError<string> => {
  if (typeof err === "string") {
    return error(err);
  }

  if (isObject(err) && hasKey(err, "body") && isObject(err.body)) {
    const { body } = err;

    if (hasKey(body, "info") && typeof body.info === "string") {
      return error(body.info);
    }

    if (hasKey(body, "message") && typeof body.message === "string") {
      const message = messages[body.message as OperationErrorMessage];
      if (message) {
        return error(message);
      }
    }

    return error(messages.UNKNOWN_ERROR);
  }

  return error("An unknown error occurred; please try again.");
};
