import React from "react";
import { IUser } from "../../openapi-client/out";
import { ActionButton } from "../common/ActionButton";

interface IUserRowProps {
  user: IUser;
  onDeleteUser: (user: IUser) => void;
  onClickEdit: () => void;
}

export const UserRow: React.FC<IUserRowProps> = ({
  user,
  onDeleteUser,
  onClickEdit,
}) => {
  return (
    <tr key={user.id} data-cy="user-row">
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.name}</td>
      <td>{user.address}</td>
      <td>{user.date_created}</td>
      <td>{user.date_updated}</td>
      <td>
        <ActionButton
          onClick={onClickEdit}
          type="button"
          data-cy="user-row-edit"
        >
          Edit
        </ActionButton>
        <ActionButton
          onClick={() => onDeleteUser(user)}
          type="button"
          data-cy="user-row-delete"
        >
          Delete
        </ActionButton>
      </td>
    </tr>
  );
};
