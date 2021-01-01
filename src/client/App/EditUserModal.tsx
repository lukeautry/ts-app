import React, { useState } from "react";
import { IUser, IUpdateUserRequest } from "../../openapi-client/out";
import { FormInput } from "../common/FormInput";
import { Modal } from "../common/Modal/Modal";
import { ModalBody } from "../common/Modal/ModalBody";
import { ModalButton } from "../common/Modal/ModalButton";
import { ModalFooter } from "../common/Modal/ModalFooter";
import { ModalHeader } from "../common/Modal/ModalHeader";
import { EditUserModalSelectors } from "./EditUserModal.selectors";

interface IEditUserModal {
  user: IUser;
  onConfirm: (userId: number, request: IUpdateUserRequest) => void;
  onClose: () => void;
}

export const EditUserModal: React.FC<IEditUserModal> = ({
  onClose,
  user,
  onConfirm,
}) => {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address || "");

  const inputSpacing = {
    marginBottom: "5px",
  };

  const onSubmit = async () => {
    if (!email || !name) {
      return;
    }

    onConfirm(user.id, {
      email,
      name,
      address,
    });
  };

  return (
    <Modal onClose={onClose} data-testid={EditUserModalSelectors.Modal}>
      <ModalHeader>Edit User</ModalHeader>
      <ModalBody>
        <FormInput
          label="Email Address"
          value={email}
          onChange={(value) => setEmail(value)}
          style={inputSpacing}
          testId={EditUserModalSelectors.EmailInput}
        />
        <FormInput
          label="Name"
          value={name}
          onChange={(value) => setName(value)}
          style={inputSpacing}
          testId={EditUserModalSelectors.NameInput}
        />
        <FormInput
          label="Address"
          value={address}
          onChange={(value) => setAddress(value)}
          testId={EditUserModalSelectors.AddressInput}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton
          bgColor="cancel"
          onClick={onClose}
          data-testid={EditUserModalSelectors.CancelButton}
        >
          Cancel
        </ModalButton>
        <ModalButton
          bgColor="primary"
          onClick={onSubmit}
          data-testid={EditUserModalSelectors.SubmitButton}
        >
          Submit
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};
