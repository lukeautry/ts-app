import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "../../../common/components/Card/Card";
import { Form } from "../../../common/components/Form/Form";
import { FormInput } from "../../../common/components/Form/FormInput";
import { FormSubmitButton } from "../../../common/components/Form/FormSubmitButton";
import { Try } from "../../../../common/try";
import { InlineErrorMessage } from "../../../common/components/Form/InlineErrorMessage";
import { FormError } from "../../../common/components/Form/FormError";
import { FullPageContainer } from "../../common/FullPageContainer";
import { FormLinks } from "../../../common/components/Form/FormLinks";
import { Link } from "../../../common/components/Link/Link";
import { LoginSelectors } from "./Login.selectors";

export interface IOnLoginParams {
  username: string;
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

export const Login: React.FC<ILoginProps> = ({
  onLogin,
  onForgotPassword,
  onRegister,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

    return;
  };

  const passwordError = () => {
    if (dirty && !password) {
      return "Password is required";
    }
  };

  const onSubmit = async () => {
    setDirty(true);

    if (username && password) {
      setIsProcessing(true);

      const result = await onLogin({
        username,
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
              label="Username"
              placeholder="Username"
              value={username}
              onChange={(val) => setUsername(val)}
              hasError={!!usernameError()}
              secondaryLabel={
                <InlineErrorMessage>{usernameError()}</InlineErrorMessage>
              }
              autoFocus={true}
              testId={LoginSelectors.UsernameInput}
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
            <FormSubmitButton processing={isProcessing}>
              <span data-testid={LoginSelectors.SubmitButton}>Login</span>
            </FormSubmitButton>
            <FormLinks>
              <Link onClick={onRegister}>
                <span data-testid={LoginSelectors.RegisterLink}>
                  Not signed up? Register
                </span>
              </Link>
              <Link onClick={onForgotPassword}>
                <span data-testid={LoginSelectors.ForgotPasswordLink}>
                  Forgot Password?
                </span>
              </Link>
            </FormLinks>
            {error && <FormError>{error}</FormError>}
          </Form>
        </Container>
      </Card>
    </FullPageContainer>
  );
};
