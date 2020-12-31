import React from "react";
import styled from "styled-components";
import { Try } from "../../../../common/try";
import { sleep } from "../../../../common/utils/sleep";
import { Profile } from "./Profile";

const Container = styled.div`
  width: 400px;
`;

const ProfileFixture = (result: Try) => (
  <Container>
    <Profile
      name="Test User"
      email="test@test.com"
      onSubmit={async () => {
        await sleep(1500);
        return result;
      }}
    />
  </Container>
);

export default {
  Default: ProfileFixture({ success: true }),
};
