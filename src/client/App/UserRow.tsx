import React from "react";
import { IUser } from "../../openapi-client/out";
import { ActionButton } from "../common/ActionButton";
import { UserRowSelectors } from "./UserRow.selectors";

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
    <tr key={user.id} data-testid={UserRowSelectors.TableRow}>
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
          data-testid={UserRowSelectors.EditButton}
        >
          Edit
        </ActionButton>
        <ActionButton
          onClick={() => onDeleteUser(user)}
          type="button"
          data-testid={UserRowSelectors.DeleteButton}
        >
          Delete
        </ActionButton>
      </td>
    </tr>
  );
};
