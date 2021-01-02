import { LoginSelectors } from "../../client/App/Unauthenticated/Login/Login.selectors";
import { NavigationSelectors } from "../../client/App/Authenticated/Navigation/Navigation.selectors";
import { RegisterSelectors } from "../../client/App/Unauthenticated/Register/Register.selectors";
import { click, get, type } from "../common/utilities";
import { getCypressTaskRoute } from "../../server/routes/get-cypress-task-route";
import { cypressConstants } from "../common/cypress-constants";

context("Register", () => {
  const { baseUrl, email, password, name } = cypressConstants;

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
    type(RegisterSelectors.NameInput, name);
    type(RegisterSelectors.PasswordInput, password);
    type(RegisterSelectors.ConfirmPasswordInput, password);
    click(RegisterSelectors.SubmitButton);
    click(NavigationSelectors.LogOutLink);
    get(LoginSelectors.SubmitButton).should("exist");
  });
});
