import React from "react";
import styled from "styled-components";
import { gravatarSize } from "../../variables";

interface INavigationLinkProps {
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const Container = styled.a<INavigationLinkProps>`
  display: flex;
  padding: 10px;
  text-transform: uppercase;
  font-size: 12px;
  color: white;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: grey;
  }

  svg {
    width: 12px;
  }

  ${(props) => {
    if (props.isActive) {
      return `
        background-color: #509dff;

        &:hover {
          background-color: #509dff;
        }
      `;
    }
  }}
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: ${gravatarSize}px;
  margin-right: 10px;
`;

export const NavigationLink: React.FC<INavigationLinkProps> = (props) => (
  <Container {...props}>
    {props.icon && <IconContainer>{props.icon}</IconContainer>}
    {props.children}
  </Container>
);
