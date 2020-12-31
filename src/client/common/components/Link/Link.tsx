import React from "react";
import styled from "styled-components";
import { blue, hoverBlue } from "../../variables";

interface ILinkProps {
  onClick?: () => void;
}

const Container = styled.a`
  cursor: pointer;
  color: ${blue};

  &:hover {
    color: ${hoverBlue};
    text-decoration: underline;
  }
`;

export const Link: React.FC<ILinkProps> = ({ children, onClick }) => (
  <Container onClick={onClick}>{children}</Container>
);
