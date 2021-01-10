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
import { RegisterSelectors } from "./Register.selectors";

interface IRegisterProps {
  onRegister: (params: IOnRegisterParams) => Promise<Try>;
  onBackToLogin: () => void;
}

export interface IOnRegisterParams {
  username: string;
  email: string;
  password: string;
}

const Container = styled.div`
  width: 320px;
`;

export const Register: React.FC<IRegisterProps> = ({
  onRegister,
  onBackToLogin,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string>();

  const usernameError = () => {
    if (!dirty) {
      return;
    }

    if (!username) {
      return "Username is required";
    }
  };

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

  const confirmPasswordError = () => {
    if (!dirty) {
      return;
    }

    if (!confirmPassword) {
      return "Please confirm password";
    }

    if (password !== confirmPassword) {
      return "Passwords must match";
    }
  };

  const renderErrorMessage = (value: string | undefined) => (
    <InlineErrorMessage>{value}</InlineErrorMessage>
  );

  const onSubmit = async () => {
    setDirty(true);

    if (isValidEmail(email) && password && password === confirmPassword) {
      setIsProcessing(true);

      const result = await onRegister({
        username,
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
              secondaryLabel={renderErrorMessage(emailError())}
              autoFocus={true}
              testId={RegisterSelectors.EmailInput}
            />
            <FormInput
              label="Username"
              placeholder="Username"
              value={username}
              onChange={(val) => setUsername(val)}
              hasError={!!usernameError()}
              secondaryLabel={renderErrorMessage(usernameError())}
              testId={RegisterSelectors.UsernameInput}
            />
            <FormInput
              label="Password"
              placeholder="Password"
              inputType="password"
              value={password}
              onChange={(val) => setPassword(val)}
              hasError={!!passwordError()}
              secondaryLabel={renderErrorMessage(passwordError())}
              testId={RegisterSelectors.PasswordInput}
            />
            <FormInput
              label="Confirm Password"
              placeholder="Confirm Password"
              inputType="password"
              value={confirmPassword}
              onChange={(val) => setConfirmPassword(val)}
              hasError={!!confirmPasswordError()}
              secondaryLabel={renderErrorMessage(confirmPasswordError())}
              testId={RegisterSelectors.ConfirmPasswordInput}
            />
            <FormSubmitButton processing={isProcessing}>
              <span data-testid={RegisterSelectors.SubmitButton}>Register</span>
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
