import React from "react";
import styled from "styled-components";
import {
  labelColor,
  labelFontSize,
  formSpacingMargin,
  labelAndErrorHeight,
} from "../../variables";
import { Input } from "../Input/Input";

interface IFormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  inputType?: string;
  secondaryLabel?: JSX.Element | string;
  hasError?: boolean;
  autoFocus?: boolean;
  testId?: string;
}

const Container = styled.div`
  width: 100%;

  &:not(:first-child) {
    ${formSpacingMargin}
  }
`;

const LabelAndErrorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${labelAndErrorHeight}
`;

const Label = styled.label`
  display: block;
  text-transform: uppercase;
  ${labelFontSize}
  ${labelColor}
`;

export const FormInput: React.FC<IFormInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  inputType,
  secondaryLabel,
  hasError,
  autoFocus,
  testId,
}) => {
  return (
    <Container>
      <LabelAndErrorContainer>
        <Label>{label}</Label>
        {secondaryLabel}
      </LabelAndErrorContainer>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={inputType}
        hasError={hasError}
        autoFocus={autoFocus}
        testId={testId}
      />
    </Container>
  );
};
