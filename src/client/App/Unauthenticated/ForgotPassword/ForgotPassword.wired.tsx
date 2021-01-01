import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { getPath } from "../../../../common/paths";
import { UsersService } from "../../../../openapi-client/out";
import { AppContext } from "../../AppContext";
import { getAPIError } from "../../common/get-api-error";
import { ForgotPassword, OnSendResetFn } from "./ForgotPassword";

export const WiredForgotPassword = () => {
  const appContext = useContext(AppContext);
  const history = useHistory();

  const goToLogin = () => history.push(getPath((p) => p.login));

  const onSendReset: OnSendResetFn = async (email) => {
    try {
      await UsersService.resetPassword({ email });
      goToLogin();
      appContext.addMessage({
        type: "success",
        title: "An email has been sent to reset your password.",
      });
      return { success: true };
    } catch (err) {
      return getAPIError(err);
    }
  };

  return <ForgotPassword onSendReset={onSendReset} onBackToLogin={goToLogin} />;
};
