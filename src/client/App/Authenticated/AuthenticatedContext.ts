import React from "react";
import { IUser } from "../../../openapi-client/out";

interface IAuthenticatedContext {
  user: IUser;
}

export const AuthenticatedContext = React.createContext<IAuthenticatedContext>(
  undefined!
);
