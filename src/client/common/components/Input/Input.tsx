import React from "react";
import styled from "styled-components";
import {
  standardBorderRadius,
  focusBorder,
  standardInputPadding,
  lightBorder,
  errorColor,
} from "../../variables";

interface IInputProps {
  value: string;
  placeholder?: string;
  onChange?: (val: string) => void;
  type?: string;
  hasError?: boolean;
  autoFocus?: boolean;
  testId?: string;
}

const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  ${lightBorder}
  ${standardInputPadding}
  ${standardBorderRadius}
  outline: none;

  &:focus {
    ${focusBorder}
  }

  ${(props) => {
    if (props.hasError) {
      return `border-color: ${errorColor};`;
    }
  }}
`;

export const Input = ({
  placeholder,
  value,
  onChange,
  type,
  hasError,
  autoFocus,
  testId,
}: IInputProps) => {
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChange={onInputChange}
      type={type}
      hasError={hasError}
      autoFocus={autoFocus}
      data-testid={testId}
    />
  );
};
