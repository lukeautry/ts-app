import React from "react";
import { IUser } from "../../openapi-client/out";
import { ToastMessageType } from "../common/components/Toaster/ToastMessage";

export interface AppMessage {
  type: ToastMessageType;
  title: string;
  subtitle?: string;
  timeout?: "none" | number;
}

export interface IAppContext {
  user: IUser | "loading" | undefined;
  setUser: (user: IUser) => void;
  messages: Array<AppMessage>;
  addMessage: (message: AppMessage) => void;
  removeMessage: (message: AppMessage) => void;
  onLogOut: () => void;
}

export const AppContext = React.createContext<IAppContext>(undefined!);
