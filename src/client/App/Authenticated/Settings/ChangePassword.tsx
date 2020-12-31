import React, { useState } from "react";
import { Try } from "../../../../common/try";
import { Form } from "../../../common/components/Form/Form";
import { FormError } from "../../../common/components/Form/FormError";
import { FormInput } from "../../../common/components/Form/FormInput";
import { FormSubmitButton } from "../../../common/components/Form/FormSubmitButton";
import { InlineErrorMessage } from "../../../common/components/Form/InlineErrorMessage";

export type ChangePasswordSubmitFn = (params: {
  oldPassword: string;
  newPassword: string;
}) => Promise<Try>;

interface IChangePasswordProps {
  onSubmit: ChangePasswordSubmitFn;
}

export const ChangePassword: React.FC<IChangePasswordProps> = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string>();
  const [isProcessing, setIsProcessing] = useState(false);

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setDirty(false);
    setError(undefined);
  };

  const currentPasswordError = () => {
    if (dirty && !currentPassword) {
      return "Current password is required";
    }
  };

  const newPasswordError = () => {
    if (dirty && !newPassword) {
      return "New password is required";
    }
  };

  const confirmPasswordError = () => {
    if (!dirty) {
      return;
    }

    if (!confirmNewPassword) {
      return "Please confirm password";
    }

    if (newPassword !== confirmNewPassword) {
      return "Passwords must match";
    }
  };

  const canSubmit = () =>
    !!currentPassword && !!newPassword && newPassword === confirmNewPassword;

  const onSubmit = async () => {
    setDirty(true);

    if (!canSubmit()) {
      return;
    }

    setIsProcessing(true);
    setError(undefined);
    const result = await props.onSubmit({
      oldPassword: currentPassword,
      newPassword,
    });
    if (result.success) {
      reset();
    } else {
      setError(result.error);
    }

    setIsProcessing(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormInput
        inputType="password"
        label="Current Password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(val) => setCurrentPassword(val)}
        hasError={!!currentPasswordError()}
        secondaryLabel={
          <InlineErrorMessage>{currentPasswordError()}</InlineErrorMessage>
        }
        autoFocus={true}
      />
      <FormInput
        inputType="password"
        label="New Password"
        placeholder="New Password"
        value={newPassword}
        onChange={(val) => setNewPassword(val)}
        hasError={!!currentPasswordError()}
        secondaryLabel={
          <InlineErrorMessage>{newPasswordError()}</InlineErrorMessage>
        }
      />
      <FormInput
        inputType="password"
        label="Confirm New Password"
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChange={(val) => setConfirmNewPassword(val)}
        hasError={!!confirmPasswordError()}
        secondaryLabel={
          <InlineErrorMessage>{confirmPasswordError()}</InlineErrorMessage>
        }
      />
      <FormSubmitButton processing={isProcessing}>
        Update Password
      </FormSubmitButton>
      {error && <FormError>{error}</FormError>}
    </Form>
  );
};
