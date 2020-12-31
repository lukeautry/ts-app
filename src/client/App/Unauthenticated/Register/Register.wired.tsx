import React from "react";
import { useHistory } from "react-router-dom";
import { getPath } from "../../../../common/paths";
import { Try } from "../../../../common/try";
import { UsersService } from "../../../../openapi-client/out";
import { getAPIError } from "../../common/get-api-error";
import { IOnRegisterParams, Register } from "./Register";

export const WiredRegister = () => {
  const history = useHistory();

  const onRegister = async (params: IOnRegisterParams): Promise<Try> => {
    try {
      const result = await UsersService.register({
        requestBody: params,
      });

      console.log(result);

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
