import React from "react";
import styled from "styled-components";
import {
  buttonBlueBg,
  buttonBlueBgHover,
  buttonHeight,
  buttonTextColor,
  standardBorderRadius,
} from "../../variables";
import { ButtonLoader } from "./ButtonLoader";

interface IButtonProps {
  type?: "button" | "submit";
  processing?: boolean;
  disabled?: boolean;
  testId?: string;
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  ${buttonHeight}
  ${standardBorderRadius}
  ${buttonBlueBg}
  ${buttonTextColor}
  outline: none;
  border: none;
  cursor: pointer;
  width: 100%;

  &:focus {
    border: none;
  }

  &:hover {
    ${buttonBlueBgHover};
  }
`;

export const Button: React.FC<IButtonProps> = ({
  type = "button",
  children,
  processing,
  disabled,
  testId,
}) => (
  <StyledButton type={type} disabled={disabled} data-testid={testId}>
    {processing ? <ButtonLoader size={25} /> : children}
  </StyledButton>
);
