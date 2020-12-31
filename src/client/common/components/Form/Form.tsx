import React from "react";
import styled from "styled-components";
import { formPadding } from "../../variables";

interface IFormProps {
  onSubmit?: () => void;
}

const StyledForm = styled.form`
  width: 100%;
  ${formPadding}
`;

export const Form: React.FC<IFormProps> = ({ children, onSubmit }) => {
  const submitHandler: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit();
    }
  };

  return <StyledForm onSubmit={submitHandler}>{children}</StyledForm>;
};
