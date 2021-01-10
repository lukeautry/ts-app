import React, { useContext } from "react";
import styled from "styled-components";
import { UsersService } from "../../../../../openapi-client/out";
import { AppContext } from "../../../AppContext";
import { getAPIError } from "../../../common/get-api-error";
import { AuthenticatedContext } from "../../AuthenticatedContext";
import { ProfileSubmitFn, Profile } from "./Profile";

const Container = styled.div`
  max-width: 400px;
`;

export const WiredProfile = () => {
  const { user } = useContext(AuthenticatedContext);
  const { setUser, addMessage } = useContext(AppContext);
  const { email, username } = user;

  const onSubmit: ProfileSubmitFn = async (params) => {
    try {
      const result = await UsersService.update({
        requestBody: {
          email: params.email,
        },
      });
      setUser(result);

      addMessage({
        type: "success",
        title: "Profile successfully updated",
      });

      return { success: true };
    } catch (err) {
      return getAPIError(err);
    }
  };

  return (
    <Container>
      <Profile onSubmit={onSubmit} email={email} username={username} />
    </Container>
  );
};
