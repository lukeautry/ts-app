import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { getPath } from "../../../../common/paths";
import { Try } from "../../../../common/try";
import { UsersService } from "../../../../openapi-client/out";
import { AppContext } from "../../AppContext";
import { setAccessToken } from "../../common/access-token-cache";
import { getAPIError } from "../../common/get-api-error";
import { IOnLoginParams, Login } from "./Login";

export const WiredLogin = () => {
  const history = useHistory();
  const context = useContext(AppContext);

  const onLogin = async ({ email, password }: IOnLoginParams): Promise<Try> => {
    try {
      const accessToken = await UsersService.login({
        requestBody: {
          email,
          password,
        },
      });

      setAccessToken(accessToken.value);
      context.setUser(accessToken.user);

      return {
        success: true,
      };
    } catch (err) {
      return getAPIError(err);
    }
  };

  return (
    <Login
      onLogin={onLogin}
      onForgotPassword={() => history.push(getPath((p) => p.forgotPassword))}
      onRegister={() => history.push(getPath((p) => p.register))}
    />
  );
};
