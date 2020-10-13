import React, { useState } from "react";
import styled from "styled-components";
import { isValidEmail } from "../../common/validation/is-valid-email";
import { Api } from "../api/api";
import { ActionButton } from "../common/ActionButton";
import { UserGridInput } from "../common/UserGridInput";
import { EditUserModal } from "./EditUserModal";
import { UserRow } from "./UserRow";

interface IUserGridProps {
  users: Api.IUser[];
  onDeleteUser: (user: Api.IUser) => void;
  onCreateUser: (params: Api.ICreateUserRequest) => void;
  onUpdateUser: (user: Api.IUser) => void;
}

const Container = styled.div`
  padding: 10px;
`;

const Table = styled.table`
  border: 1px solid #ffffff;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  color: black;

  tr:nth-child(even) {
    background: #f1f1f1;
  }

  td,
  th {
    font-size: 12px;
    border: 1px solid black;
    padding: 4px;
  }

  th {
    text-align: left;
    font-size: 10px;
  }
`;

export const UserGrid: React.FC<IUserGridProps> = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [editUser, setEditUser] = useState<Api.IUser | undefined>(undefined);

  const canSubmitCreate = () => !!email && !!name;

  const onClickCreate = () => {
    if (!canSubmitCreate) {
      return;
    }

    props.onCreateUser({
      email,
      name,
      address,
    });
  };

  const showEmailError = () => !!email && !isValidEmail(email);

  return (
    <Container>
      {editUser && (
        <EditUserModal
          user={editUser}
          onSuccess={(user) => {
            props.onUpdateUser(user);
            setEditUser(undefined);
          }}
          onClose={() => setEditUser(undefined)}
        />
      )}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Address</th>
            <th>Date Created</th>
            <th>Date Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onDeleteUser={props.onDeleteUser}
              onClickEdit={() => setEditUser(user)}
            />
          ))}
          <tr key="create-user">
            <td />
            <td>
              <UserGridInput
                type="email"
                placeholder="Email Address"
                value={email}
                className={showEmailError() ? "error" : undefined}
                onChange={(event) => setEmail(event.target.value)}
              />
            </td>
            <td>
              <UserGridInput
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </td>
            <td>
              <UserGridInput
                type="text"
                placeholder="Address (Optional)"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              ></UserGridInput>
            </td>
            <td />
            <td />
            <td>
              <ActionButton
                type="button"
                disabled={!canSubmitCreate()}
                onClick={onClickCreate}
              >
                Save
              </ActionButton>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
