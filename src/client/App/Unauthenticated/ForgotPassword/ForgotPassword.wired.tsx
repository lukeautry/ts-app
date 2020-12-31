import React from "react";
import { useHistory } from "react-router-dom";
import { getPath } from "../../../../common/paths";
import { ForgotPassword } from "./ForgotPassword";

export const WiredForgotPassword = () => {
  const history = useHistory();

  return (
    <ForgotPassword
      onSendReset={async () => ({ success: true })}
      onBackToLogin={() => history.push(getPath((p) => p.login))}
    />
  );
};
