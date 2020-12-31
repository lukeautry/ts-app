import React from "react";
import styled from "styled-components";
import { navBg } from "../../variables";

const Container = styled.div`
  display: flex;
  background-color: ${navBg};
  flex-direction: column;
`;

export const NavigationBar: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};
