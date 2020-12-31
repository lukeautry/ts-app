import React, { useContext } from "react";
import styled from "styled-components";
import { UsersService } from "../../../../openapi-client/out";
import { AppContext } from "../../AppContext";
import { getAPIError } from "../../common/get-api-error";
import { ChangePassword, ChangePasswordSubmitFn } from "./ChangePassword";

const Container = styled.div`
  max-width: 400px;
`;

export const WiredChangePassword = () => {
  const appContext = useContext(AppContext);

  const onSubmit: ChangePasswordSubmitFn = async (params) => {
    try {
      await UsersService.changePassword({
        requestBody: params,
      });
      appContext.addMessage({
        type: "success",
        title: "Password successfully updated",
      });
      return { success: true };
    } catch (err) {
      return getAPIError(err);
    }
  };

  return (
    <Container>
      <ChangePassword onSubmit={onSubmit} />
    </Container>
  );
};
