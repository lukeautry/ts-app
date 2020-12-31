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

interface IRegisterProps {
  onRegister: (params: IOnRegisterParams) => Promise<Try>;
  onBackToLogin: () => void;
}

export interface IOnRegisterParams {
  email: string;
  password: string;
  name: string;
}

const Container = styled.div`
  width: 320px;
`;

export const Register: React.FC<IRegisterProps> = ({
  onRegister,
  onBackToLogin,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string>();

  const nameError = () => {
    if (!dirty) {
      return;
    }

    if (!name) {
      return "Name is required";
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

    if (
      isValidEmail(email) &&
      password &&
      password === confirmPassword &&
      name
    ) {
      setIsProcessing(true);

      const result = await onRegister({
        name,
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
            />
            <FormInput
              label="Name"
              placeholder="Name"
              value={name}
              onChange={(val) => setName(val)}
              hasError={!!nameError()}
              secondaryLabel={renderErrorMessage(nameError())}
            />
            <FormInput
              label="Password"
              placeholder="Password"
              inputType="password"
              value={password}
              onChange={(val) => setPassword(val)}
              hasError={!!passwordError()}
              secondaryLabel={renderErrorMessage(passwordError())}
            />
            <FormInput
              label="Confirm Password"
              placeholder="Confirm Password"
              inputType="password"
              value={confirmPassword}
              onChange={(val) => setConfirmPassword(val)}
              hasError={!!confirmPasswordError()}
              secondaryLabel={renderErrorMessage(confirmPasswordError())}
            />
            <FormSubmitButton processing={isProcessing}>
              Register
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
