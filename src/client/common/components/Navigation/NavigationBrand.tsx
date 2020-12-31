import React from "react";
import styled from "styled-components";
import { navBgDark } from "../../variables";

const Container = styled.div`
  padding: 10px;
  color: #b4b4b4;
  letter-spacing: 2px;
  font-weight: bold;
  margin-bottom: 10px;
  background-color: ${navBgDark};
`;

export const NavigationBrand: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
