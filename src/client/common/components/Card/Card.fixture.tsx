import React from "react";
import styled from "styled-components";
import { Card } from "./Card";

const Container = styled.div`
  padding: 10px;
`;

export default {
  Default: (
    <Container>
      <Card>
        <div style={{ width: "300px", height: "200px" }} />
      </Card>
    </Container>
  ),
};
