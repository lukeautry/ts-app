import React from "react";
import styled from "styled-components";
import { Link } from "./Link";

const Container = styled.div`
  padding: 10px;
`;

export default {
  Default: (
    <Container>
      <Link>My Link</Link>
    </Container>
  ),
};
