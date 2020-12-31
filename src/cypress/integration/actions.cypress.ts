import { AppSelectors } from "../../client/App/App";
import { CreateUserRowSelectors } from "../../client/App/CreateUserRow";
import { EditUserModalSelectors } from "../../client/App/EditUserModal";
import { UserRowSelectors } from "../../client/App/UserRow";

const selector = (val: string) => `[data-testid=${val}]`;

context("Basic Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("can add user", () => {
    cy.get(selector(CreateUserRowSelectors.EmailInput))
      .type("test@test.com")
      .get(selector(CreateUserRowSelectors.NameInput))
      .type("Test User")
      .get(selector(CreateUserRowSelectors.AddressInput))
      .type("101 Washington Drive")
      .get(selector(CreateUserRowSelectors.SaveButton))
      .click()
      .get(selector(UserRowSelectors.TableRow))
      .should("exist");
  });

  it("can edit user", () => {
    const newEmail = "test1@test.com";
    const newName = "Test1 User";
    const newAddress = "101 Washington Changed";

    cy.get(selector(UserRowSelectors.EditButton))
      .click()
      .get(selector(EditUserModalSelectors.EmailInput))
      .clear()
      .type(newEmail)
      .get(selector(EditUserModalSelectors.NameInput))
      .clear()
      .type(newName)
      .get(selector(EditUserModalSelectors.AddressInput))
      .clear()
      .type(newAddress)
      .get(selector(EditUserModalSelectors.SubmitButton))
      .click();

    const row = () => cy.get(selector(UserRowSelectors.TableRow));
    row().contains(newEmail);
    row().contains(newName);
    row().contains(newAddress);
  });

  it("can delete user", () => {
    cy.get(selector(UserRowSelectors.DeleteButton))
      .click()
      .get(selector(AppSelectors.ConfirmDeleteButton))
      .click()
      .get(UserRowSelectors.TableRow)
      .should("not.exist");
  });
});
