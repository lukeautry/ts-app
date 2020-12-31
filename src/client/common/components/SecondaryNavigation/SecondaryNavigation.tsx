import React from "react";
import styled from "styled-components";
import { lightBorderColor } from "../../variables";

const Container = styled.div`
  padding-right: 20px;
  border-right: 1px solid ${lightBorderColor};
  margin-right: 10px;
  padding-top: 20px;
`;

export const SecondaryNavigation: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
