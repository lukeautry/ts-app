import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

const Container = styled.div`
  width: 300px;
  padding: 10px;
`;

export default {
  Default: (
    <Container>
      <Button>A Button</Button>
    </Container>
  ),
  Processing: (
    <Container>
      <Button processing={true}>A Button</Button>
    </Container>
  ),
};
