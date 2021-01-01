import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { IUser } from "../../openapi-client/out";
import { UserRow } from "./UserRow";
import { UserRowSelectors } from "./UserRow.selectors";

const now = new Date().toISOString();

const fakeUser: IUser = {
  id: 1,
  name: "Test User",
  email: "test_user@test.com",
  address: "101 Washington Ave",
  date_created: now,
  date_updated: now,
};

describe("UserRow", () => {
  it("should fire click events", () => {
    const onClickEdit = jest.fn();
    const onClickDelete = jest.fn();

    const result = render(
      <table>
        <tbody>
          <UserRow
            user={fakeUser}
            onClickEdit={onClickEdit}
            onDeleteUser={onClickDelete}
          />
        </tbody>
      </table>
    );

    expect(onClickEdit).toHaveBeenCalledTimes(0);
    expect(onClickDelete).toHaveBeenCalledTimes(0);

    fireEvent.click(result.getByTestId(UserRowSelectors.EditButton));
    expect(onClickEdit).toHaveBeenCalledTimes(1);

    fireEvent.click(result.getByTestId(UserRowSelectors.DeleteButton));
    expect(onClickDelete).toHaveBeenCalledTimes(1);
  });
});
