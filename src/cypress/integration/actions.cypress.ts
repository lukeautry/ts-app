/// <reference types="cypress" />

const selector = (val: string) => `[data-cy=${val}]`;

context("Basic Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("can add user", () => {
    cy.get(selector("create-user-email"))
      .type("test@test.com")
      .get(selector("create-user-name"))
      .type("Test User")
      .get(selector("create-user-address"))
      .type("101 Washington Drive")
      .get(selector("create-user-save"))
      .click()
      .get(selector("user-row"))
      .should("exist");
  });

  it("can edit user", () => {
    const newEmail = "test1@test.com";
    const newName = "Test1 User";
    const newAddress = "101 Washington Changed";

    cy.get(selector("user-row-edit"))
      .click()
      .get(selector("edit-user-modal-email"))
      .clear()
      .type(newEmail)
      .get(selector("edit-user-modal-name"))
      .clear()
      .type(newName)
      .get(selector("edit-user-modal-address"))
      .clear()
      .type(newAddress)
      .get(selector("edit-user-modal-submit"))
      .click();

    const row = () => cy.get(selector("user-row"));
    row().contains(newEmail);
    row().contains(newName);
    row().contains(newAddress);
  });

  it("can delete user", () => {
    cy.get("[data-cy=user-row-delete]")
      .click()
      .get("[data-cy=confirm-delete-user")
      .click()
      .get("[data-cy=user-row")
      .should("not.exist");
  });
});
