import { LoginSelectors } from "../../client/App/Unauthenticated/Login/Login.selectors";
import { NavigationSelectors } from "../../client/App/Authenticated/Navigation/Navigation.selectors";
import { RegisterSelectors } from "../../client/App/Unauthenticated/Register/Register.selectors";
import { click, get, type } from "../common/utilities";
import { getCypressTaskRoute } from "../../server/cypress-tasks";

context("Register", () => {
  const baseUrl = "http://localhost:3037";
  const email = "test_new@test.com";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.request(
      getCypressTaskRoute(baseUrl, "deleteUserByEmail", {
        email,
      })
    );
  });

  it("can register for an account", () => {
    click(LoginSelectors.RegisterLink);
    type(RegisterSelectors.EmailInput, email);
    type(RegisterSelectors.NameInput, "Test User");
    type(RegisterSelectors.PasswordInput, "test1234");
    type(RegisterSelectors.ConfirmPasswordInput, "test1234");
    click(RegisterSelectors.SubmitButton);
    click(NavigationSelectors.LogOutLink);
    get(LoginSelectors.SubmitButton).should("exist");
  });
});
