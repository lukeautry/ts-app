import * as express from "express";
import { IUser } from "../node/database/entities/user";
import { HttpStatusCode } from "./common/http-status-code";
import { OperationError } from "./common/operation-error";
import { AuthenticationService } from "./services/authentication-service";

export interface IRequestContext extends express.Request {
  user: IUser;
}

const authenticationError = new OperationError(
  "UNAUTHORIZED",
  HttpStatusCode.UNAUTHORIZED
);

export const expressAuthentication = async (
  request: IRequestContext,
  securityName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _scopes?: string[]
) => {
  if (securityName === "api_token") {
    const token = request.headers.authorization as string;
    if (!token) {
      throw authenticationError;
    }

    const jwt = token.replace("Bearer ", "");

    try {
      return await new AuthenticationService().getIdentity(jwt);
    } catch {
      throw authenticationError;
    }
  }

  return;
};
