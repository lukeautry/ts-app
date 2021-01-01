import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { getPath } from "../../../../common/paths";
import { Try } from "../../../../common/try";
import { UsersService } from "../../../../openapi-client/out";
import { AppContext } from "../../AppContext";
import { setAccessToken } from "../../common/access-token-cache";
import { getAPIError } from "../../common/get-api-error";
import { IOnRegisterParams, Register } from "./Register";

export const WiredRegister = () => {
  const history = useHistory();
  const appContext = useContext(AppContext);

  const onRegister = async (params: IOnRegisterParams): Promise<Try> => {
    try {
      const accessToken = await UsersService.register({
        requestBody: params,
      });

      setAccessToken(accessToken.value);
      appContext.setUser(accessToken.user);

      return { success: true };
    } catch (err) {
      return getAPIError(err);
    }
  };

  return (
    <Register
      onRegister={onRegister}
      onBackToLogin={() => history.push(getPath((p) => p.login))}
    />
  );
};
