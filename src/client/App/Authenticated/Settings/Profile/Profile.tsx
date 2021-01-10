import React, { useState } from "react";
import { Try } from "../../../../../common/try";
import { isValidEmail } from "../../../../../common/validation/is-valid-email";
import { Form } from "../../../../common/components/Form/Form";
import { FormError } from "../../../../common/components/Form/FormError";
import { FormInput } from "../../../../common/components/Form/FormInput";
import { FormSubmitButton } from "../../../../common/components/Form/FormSubmitButton";
import { InlineErrorMessage } from "../../../../common/components/Form/InlineErrorMessage";
import { ProfileSelectors } from "./Profile.selectors";

export type ProfileSubmitFn = (params: { email: string }) => Promise<Try>;

interface IProfileProps {
  email: string;
  username: string;
  onSubmit: ProfileSubmitFn;
}

export const Profile: React.FC<IProfileProps> = (props) => {
  const [email, setEmail] = useState(props.email);
  const [dirty, setDirty] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const emailError = () => {
    if (dirty) {
      return;
    }

    if (!email) {
      return "Must provide email";
    }

    if (!isValidEmail(email)) {
      return "Must provide a valid email address";
    }
  };

  const onSubmit = async () => {
    setDirty(true);

    if (!email || !isValidEmail(email)) {
      return;
    }

    setIsProcessing(true);
    setError(undefined);
    const result = await props.onSubmit({
      email,
    });
    if (!result.success) {
      setError(result.error);
    }

    setIsProcessing(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormInput
        inputType="text"
        label="Username"
        placeholder="Username"
        value={props.username}
        onChange={() => undefined}
        disabled={true}
      />
      <FormInput
        inputType="text"
        label="Email Address"
        placeholder="Email Address"
        value={email}
        onChange={(val) => setEmail(val)}
        hasError={!!emailError()}
        secondaryLabel={<InlineErrorMessage>{emailError()}</InlineErrorMessage>}
        autoFocus={true}
        testId={ProfileSelectors.EmailInput}
      />
      <FormSubmitButton processing={isProcessing}>
        <span data-testid={ProfileSelectors.SaveButton}>Update Profile</span>
      </FormSubmitButton>
      {error && <FormError>{error}</FormError>}
    </Form>
  );
};
