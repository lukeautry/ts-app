import React, { useState } from "react";
import styled from "styled-components";
import { Try } from "../../../../common/try";
import { isValidEmail } from "../../../../common/validation/is-valid-email";
import { Card } from "../../../common/components/Card/Card";
import { Form } from "../../../common/components/Form/Form";
import { FormError } from "../../../common/components/Form/FormError";
import { FormInput } from "../../../common/components/Form/FormInput";
import { FormLinks } from "../../../common/components/Form/FormLinks";
import { FormSubmitButton } from "../../../common/components/Form/FormSubmitButton";
import { InlineErrorMessage } from "../../../common/components/Form/InlineErrorMessage";
import { Link } from "../../../common/components/Link/Link";
import { FullPageContainer } from "../../common/FullPageContainer";

export type OnSendResetFn = (email: string) => Promise<Try>;

interface IForgotPasswordProps {
  email?: string;
  onSendReset: OnSendResetFn;
  onBackToLogin: () => void;
}

const Container = styled.div`
  width: 320px;
`;

export const ForgotPassword: React.FC<IForgotPasswordProps> = ({
  email: initialEmail,
  onBackToLogin,
  onSendReset,
}) => {
  const [email, setEmail] = useState(initialEmail || "");
  const [dirty, setDirty] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const emailError = () => {
    if (!dirty) {
      return;
    }

    if (!email) {
      return "Email is required";
    }

    const isValid = isValidEmail(email);
    if (!isValid) {
      return "Provide a valid email address";
    }

    return;
  };

  const onSubmit = async () => {
    setDirty(true);

    if (!isValidEmail(email)) {
      return;
    }

    setIsProcessing(true);

    const result = await onSendReset(email);
    setError(result.success ? undefined : result.error);

    setIsProcessing(false);
  };

  return (
    <FullPageContainer>
      <Card>
        <Container>
          <Form onSubmit={onSubmit}>
            <FormInput
              label="Email Address"
              placeholder="Email Address"
              value={email}
              onChange={(val) => setEmail(val)}
              hasError={!!emailError()}
              secondaryLabel={
                <InlineErrorMessage>{emailError()}</InlineErrorMessage>
              }
              autoFocus={true}
            />
            <FormSubmitButton processing={isProcessing}>
              Send Reset Password Link
            </FormSubmitButton>
            <FormLinks>
              <Link onClick={onBackToLogin}>Back to Login</Link>
            </FormLinks>
            {error && <FormError>{error}</FormError>}
          </Form>
        </Container>
      </Card>
    </FullPageContainer>
  );
};
