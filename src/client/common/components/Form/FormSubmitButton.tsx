import React from "react";
import styled from "styled-components";
import { formSpacingMargin } from "../../variables";
import { Button } from "../Button/Button";

interface IFormSubmitButtonProps {
  processing?: boolean;
  disabled?: boolean;
  testId?: string;
}

const Container = styled.div`
  ${formSpacingMargin}
`;

export const FormSubmitButton: React.FC<IFormSubmitButtonProps> = ({
  children,
  processing,
  disabled,
  testId,
}) => {
  return (
    <Container>
      <Button
        type="submit"
        processing={processing}
        disabled={disabled}
        testId={testId}
      >
        {children}
      </Button>
    </Container>
  );
};
