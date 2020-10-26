import React, { useState } from "react";
import { IUser, IUpdateUserRequest } from "../../openapi-client/out";
import { FormInput } from "../common/FormInput";
import { Modal } from "../common/Modal/Modal";
import { ModalBody } from "../common/Modal/ModalBody";
import { ModalButton } from "../common/Modal/ModalButton";
import { ModalFooter } from "../common/Modal/ModalFooter";
import { ModalHeader } from "../common/Modal/ModalHeader";

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
    <Modal onClose={onClose}>
      <ModalHeader>Edit User</ModalHeader>
      <ModalBody>
        <FormInput
          label="Email Address"
          value={email}
          onChange={(value) => setEmail(value)}
          style={inputSpacing}
        />
        <FormInput
          label="Name"
          value={name}
          onChange={(value) => setName(value)}
          style={inputSpacing}
        />
        <FormInput
          label="Address"
          value={address}
          onChange={(value) => setAddress(value)}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton bgColor="cancel" onClick={onClose}>
          Cancel
        </ModalButton>
        <ModalButton bgColor="primary" onClick={onSubmit}>
          Submit
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};
