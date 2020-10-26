import React from "react";
import styled from "styled-components";

interface IFormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

const Label = styled.label`
  display: block;
  font-size: 10px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
`;

export const FormInput: React.FC<IFormInputProps> = ({
  label,
  value,
  onChange,
  style,
}) => {
  return (
    <div style={style}>
      <Label>{label}</Label>
      <Input
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
