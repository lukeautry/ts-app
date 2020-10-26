import React, { useState } from "react";
import styled from "styled-components";
import {
  IUser,
  ICreateUserRequest,
  IUpdateUserRequest,
} from "../../openapi-client/out";
import { CreateUserRow } from "./CreateUserRow";
import { EditUserModal } from "./EditUserModal";
import { UserRow } from "./UserRow";

interface IUserGridProps {
  users: IUser[];
  onDeleteUser: (user: IUser) => void;
  onCreateUser: (params: ICreateUserRequest) => void;
  onUpdateUser: (userId: number, user: IUpdateUserRequest) => void;
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

export const UserGrid: React.FC<IUserGridProps> = ({
  users,
  onCreateUser,
  onUpdateUser,
  onDeleteUser,
}) => {
  const [editUser, setEditUser] = useState<IUser | undefined>(undefined);

  return (
    <Container>
      {editUser && (
        <EditUserModal
          user={editUser}
          onConfirm={(userId, request) => {
            onUpdateUser(userId, request);
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
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onDeleteUser={onDeleteUser}
              onClickEdit={() => setEditUser(user)}
            />
          ))}
          <CreateUserRow onCreateUser={onCreateUser} />
        </tbody>
      </Table>
    </Container>
  );
};
