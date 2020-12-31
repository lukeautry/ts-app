import React, { useState } from "react";
import { Try } from "../../../../common/try";
import { isValidEmail } from "../../../../common/validation/is-valid-email";
import { Form } from "../../../common/components/Form/Form";
import { FormError } from "../../../common/components/Form/FormError";
import { FormInput } from "../../../common/components/Form/FormInput";
import { FormSubmitButton } from "../../../common/components/Form/FormSubmitButton";
import { InlineErrorMessage } from "../../../common/components/Form/InlineErrorMessage";

export type ProfileSubmitFn = (params: {
  name: string;
  email: string;
}) => Promise<Try>;

interface IProfileProps {
  email: string;
  name: string;
  onSubmit: ProfileSubmitFn;
}

export const Profile: React.FC<IProfileProps> = (props) => {
  const [email, setEmail] = useState(props.email);
  const [name, setName] = useState(props.name);
  const [dirty, setDirty] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const nameError = () => {
    if (dirty) {
      return;
    }

    if (!name) {
      return "Must provide name";
    }
  };

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

    if (!name || !email || !isValidEmail(email)) {
      return;
    }

    setIsProcessing(true);
    setError(undefined);
    const result = await props.onSubmit({
      name,
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
        label="Email Address"
        placeholder="Email Address"
        value={email}
        onChange={(val) => setEmail(val)}
        hasError={!!emailError()}
        secondaryLabel={<InlineErrorMessage>{emailError()}</InlineErrorMessage>}
        autoFocus={true}
      />
      <FormInput
        inputType="text"
        label="Name"
        placeholder="Name"
        value={name}
        onChange={(val) => setName(val)}
        hasError={!!nameError()}
        secondaryLabel={<InlineErrorMessage>{nameError()}</InlineErrorMessage>}
      />
      <FormSubmitButton processing={isProcessing}>
        Update Profile
      </FormSubmitButton>
      {error && <FormError>{error}</FormError>}
    </Form>
  );
};
