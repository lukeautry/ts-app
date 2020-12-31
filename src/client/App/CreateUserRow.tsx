import React, { useState } from "react";
import { ICreateUserRequest } from "../../openapi-client/out";
import { ActionButton } from "../common/ActionButton";
import { UserGridInput } from "../common/UserGridInput";
import { isValidEmail } from "../../common/validation/is-valid-email";
import { componentSelectors } from "../common/utils/component-selectors";

interface ICreateUserProps {
  onCreateUser: (params: ICreateUserRequest) => void;
}

export const CreateUserRowSelectors = componentSelectors("CreateUserRow", [
  "EmailInput",
  "NameInput",
  "AddressInput",
  "SaveButton",
]);

export const CreateUserRow: React.FC<ICreateUserProps> = ({ onCreateUser }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const canSubmitCreate = () => !!email && !!name;

  const onClickCreate = () => {
    if (!canSubmitCreate()) {
      return;
    }

    onCreateUser({
      email,
      name,
      address,
    });
  };

  const showEmailError = () => !!email && !isValidEmail(email);

  return (
    <tr>
      <td />
      <td>
        <UserGridInput
          type="email"
          placeholder="Email Address"
          value={email}
          className={showEmailError() ? "error" : undefined}
          onChange={(event) => setEmail(event.target.value)}
          data-testid={CreateUserRowSelectors.EmailInput}
        />
      </td>
      <td>
        <UserGridInput
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          data-testid={CreateUserRowSelectors.NameInput}
        />
      </td>
      <td>
        <UserGridInput
          type="text"
          placeholder="Address (Optional)"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          data-testid={CreateUserRowSelectors.AddressInput}
        ></UserGridInput>
      </td>
      <td />
      <td />
      <td>
        <ActionButton
          type="button"
          disabled={!canSubmitCreate()}
          onClick={onClickCreate}
          data-testid={CreateUserRowSelectors.SaveButton}
        >
          Save
        </ActionButton>
      </td>
    </tr>
  );
};
