import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "../../../common/components/Card/Card";
import { Form } from "../../../common/components/Form/Form";
import { FormInput } from "../../../common/components/Form/FormInput";
import { FormSubmitButton } from "../../../common/components/Form/FormSubmitButton";
import { isValidEmail } from "../../../../common/validation/is-valid-email";
import { Try } from "../../../../common/try";
import { InlineErrorMessage } from "../../../common/components/Form/InlineErrorMessage";
import { FormError } from "../../../common/components/Form/FormError";
import { FullPageContainer } from "../../common/FullPageContainer";
import { FormLinks } from "../../../common/components/Form/FormLinks";
import { Link } from "../../../common/components/Link/Link";
import { componentSelectors } from "../../../common/utils/component-selectors";

export interface IOnLoginParams {
  email: string;
  password: string;
}

interface ILoginProps {
  onLogin: (params: IOnLoginParams) => Promise<Try>;
  onForgotPassword: () => void;
  onRegister: () => void;
}

const Container = styled.div`
  width: 320px;
`;

export const LoginSelectors = componentSelectors("Login", [
  "EmailInput",
  "PasswordInput",
  "SubmitButton",
]);

export const Login: React.FC<ILoginProps> = ({
  onLogin,
  onForgotPassword,
  onRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string>();

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

  const passwordError = () => {
    if (dirty && !password) {
      return "Password is required";
    }
  };

  const onSubmit = async () => {
    setDirty(true);

    if (isValidEmail(email) && password) {
      setIsProcessing(true);

      const result = await onLogin({
        email,
        password,
      });
      if (result.success) {
        setError(undefined);
      } else {
        setError(result.error);
      }

      setIsProcessing(false);
    }
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
              testId={LoginSelectors.EmailInput}
            />
            <FormInput
              label="Password"
              placeholder="Password"
              inputType="password"
              value={password}
              onChange={(val) => setPassword(val)}
              hasError={!!passwordError()}
              secondaryLabel={
                <InlineErrorMessage>{passwordError()}</InlineErrorMessage>
              }
              testId={LoginSelectors.PasswordInput}
            />
            <FormSubmitButton
              processing={isProcessing}
              testId={LoginSelectors.SubmitButton}
            >
              Login
            </FormSubmitButton>
            <FormLinks>
              <Link onClick={onRegister}>Not signed up? Register</Link>
              <Link onClick={onForgotPassword}>Forgot Password?</Link>
            </FormLinks>
            {error && <FormError>{error}</FormError>}
          </Form>
        </Container>
      </Card>
    </FullPageContainer>
  );
};
