import React from "react";
import styled from "styled-components";
import { Try } from "../../../../common/try";
import { sleep } from "../../../../common/utils/sleep";
import { ChangePassword } from "./ChangePassword";

const Container = styled.div`
  width: 400px;
`;

const ChangePasswordFixture = (result: Try) => (
  <Container>
    <ChangePassword
      onSubmit={async () => {
        await sleep(1500);
        return result;
      }}
    />
  </Container>
);

export default {
  Default: ChangePasswordFixture({ success: true }),
  WithError: ChangePasswordFixture({
    success: false,
    error: "An error occurred",
  }),
};
