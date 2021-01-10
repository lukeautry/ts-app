import { LoginSelectors } from "../../client/App/Unauthenticated/Login/Login.selectors";
import { NavigationSelectors } from "../../client/App/Authenticated/Navigation/Navigation.selectors";
import { click, get, type } from "../common/utilities";
import { getCypressTaskRoute } from "../../server/routes/get-cypress-task-route";
import { cypressConstants } from "../common/cypress-constants";

context("Login", () => {
  const { baseUrl, username, email, password } = cypressConstants;

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.request(
      getCypressTaskRoute(baseUrl, "createUser", {
        username,
        email,
        password,
      })
    );
  });

  it("can log into account and log out", () => {
    type(LoginSelectors.UsernameInput, username);
    type(LoginSelectors.PasswordInput, password);
    click(LoginSelectors.SubmitButton);
    click(NavigationSelectors.LogOutLink);
    get(LoginSelectors.SubmitButton).should("exist");
  });
});
