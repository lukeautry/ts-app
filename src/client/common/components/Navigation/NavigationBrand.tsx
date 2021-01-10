import React from "react";
import styled from "styled-components";
import { navBgDark } from "../../variables";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  color: #b4b4b4;
  letter-spacing: 2px;
  font-weight: bold;
  background-color: ${navBgDark};
  font-size: 14px;
`;

export const NavigationBrand: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
