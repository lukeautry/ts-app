import React, { useContext, useEffect, useState } from "react";
import { IUser, UsersService, OpenAPI } from "../../openapi-client/out";
import { AppLoading } from "../common/components/AppLoading";
import { AppContext, AppMessage, IAppContext } from "./AppContext";
import { Authenticated } from "./Authenticated/Authenticated";
import { clearAccessToken, getAccessToken } from "./common/access-token-cache";
import { MessageQueue } from "./common/MessageQueue";
import { UnauthenticatedRouter } from "./Unauthenticated/UnauthenticatedRouter";

const AppRouter = () => {
  const { user } = useContext(AppContext);

  const render = () => {
    if (user === "loading") {
      return <AppLoading />;
    } else if (user) {
      return <Authenticated user={user} />;
    } else {
      return <UnauthenticatedRouter />;
    }
  };

  return (
    <div>
      {render()}
      <MessageQueue />
    </div>
  );
};

export const App = () => {
  const [user, setUser] = useState<IUser | "loading" | undefined>("loading");
  const [messages, setMessages] = useState<Array<AppMessage>>([]);

  const removeMessage = (message: AppMessage): void =>
    setMessages((m) => m.filter((element) => element !== message));

  const addMessage = (message: AppMessage) => {
    setMessages((m) => [message, ...m]);

    if (message.timeout !== "none") {
      setTimeout(() => {
        console.log(message);
        removeMessage(message);
      }, message.timeout ?? 5000);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const storedToken = getAccessToken();
        if (storedToken) {
          OpenAPI.TOKEN = storedToken;
          const currentUser = await UsersService.current();
          setUser(currentUser);
        } else {
          setUser(undefined);
        }
      } catch (err) {
        addMessage({
          type: "error",
          title: "Session expired",
          subtitle:
            "You've been logged out for your security. Please log in again.",
        });
        setUser(undefined);
      }
    };

    load();
  }, []);

  const value: IAppContext = {
    user,
    setUser,
    messages,
    addMessage,
    removeMessage,
    onLogOut: () => {
      OpenAPI.TOKEN = "";
      clearAccessToken();
      setUser(undefined);
    },
  };

  return (
    <AppContext.Provider value={value}>
      <AppRouter />
    </AppContext.Provider>
  );
};
