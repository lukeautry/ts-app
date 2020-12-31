import React from "react";
import styled from "styled-components";

interface ISecondaryNavigationLinkProps {
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const activeColor = "#78c0f6";

const Container = styled.a<ISecondaryNavigationLinkProps>`
  display: block;
  cursor: pointer;
  font-size: 14px;
  color: #5d5d5d;
  text-decoration: none;
  border-bottom: 1px solid transparent;

  &:hover {
    color: ${activeColor};
  }
`;

const InnerContainer = styled.span<ISecondaryNavigationLinkProps>`
  display: inline-block;
  padding-bottom: 2px;
  margin-bottom: 10px;

  ${(props) => {
    if (props.isActive) {
      return `
        color: ${activeColor};
        border-bottom: 1px solid ${activeColor};
      `;
    }
  }}
`;

export const SecondaryNavigationLink: React.FC<ISecondaryNavigationLinkProps> = (
  props
) => (
  <Container {...props}>
    <InnerContainer {...props}>{props.children}</InnerContainer>
  </Container>
);
