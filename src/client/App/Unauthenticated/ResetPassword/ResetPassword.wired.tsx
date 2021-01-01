import React from "react";
import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getPath } from "../../../../common/paths";
import { UsersService } from "../../../../openapi-client/out";
import { AppContext } from "../../AppContext";
import { setAccessToken } from "../../common/access-token-cache";
import { getAPIError } from "../../common/get-api-error";
import { OnResetFn, ResetPassword } from "./ResetPassword";

export const WiredResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const appContext = useContext(AppContext);
  const history = useHistory();

  const goToLogin = () => history.push(getPath((p) => p.login));

  const onReset: OnResetFn = async (password) => {
    try {
      const accessToken = await UsersService.consumeResetPassword({
        requestBody: {
          token,
          password,
        },
      });

      setAccessToken(accessToken.value);
      appContext.setUser(accessToken.user);

      return { success: true };
    } catch (err) {
      return getAPIError(err);
    }
  };

  return <ResetPassword onReset={onReset} onBackToLogin={goToLogin} />;
};
