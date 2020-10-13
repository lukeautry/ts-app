import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Api } from "../api/api";
import { Modal } from "../common/Modal/Modal";
import { ModalBody } from "../common/Modal/ModalBody";
import { ModalButton } from "../common/Modal/ModalButton";
import { ModalFooter } from "../common/Modal/ModalFooter";
import { ModalHeader } from "../common/Modal/ModalHeader";
import { UserGrid } from "./UserGrid";

const Container = styled.div`
  * {
    font-family: monospace;
  }
`;

export const App = () => {
  const [users, setUsers] = useState<Api.IUser[] | undefined>(undefined);
  const [confirmingDeleteUser, setConfirmingDeleteUser] = useState<
    Api.IUser | undefined
  >(undefined);

  const getUsers = async () => {
    const users = await new Api.UsersService().get({});
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onDeleteUser = async (user: Api.IUser) => {
    setConfirmingDeleteUser(user);
  };

  const onConfirmDeleteUser = async (user: Api.IUser) => {
    setUsers(undefined);
    await new Api.UsersService().deleteUser({ user_id: user.id });
    getUsers();
    setConfirmingDeleteUser(undefined);
  };

  const onCreateUser = async (params: Api.ICreateUserRequest) => {
    setUsers(undefined);
    await new Api.UsersService().createUser(params);
    getUsers();
  };

  const onUpdateUser = () => {
    getUsers();
  };

  const content = () => {
    if (users) {
      return (
        <UserGrid
          users={users}
          onDeleteUser={onDeleteUser}
          onCreateUser={onCreateUser}
          onUpdateUser={onUpdateUser}
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <Container>
      {confirmingDeleteUser && (
        <Modal onClose={() => setConfirmingDeleteUser(undefined)}>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete this user?</ModalBody>
          <ModalFooter>
            <ModalButton
              bgColor="cancel"
              onClick={() => setConfirmingDeleteUser(undefined)}
            >
              Cancel
            </ModalButton>
            <ModalButton
              bgColor="primary"
              onClick={() => onConfirmDeleteUser(confirmingDeleteUser)}
            >
              Confirm
            </ModalButton>
          </ModalFooter>
        </Modal>
      )}
      {content()}
    </Container>
  );
};
