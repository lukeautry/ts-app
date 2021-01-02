import { LoginSelectors } from "../../client/App/Unauthenticated/Login/Login.selectors";
import { NavigationSelectors } from "../../client/App/Authenticated/Navigation/Navigation.selectors";
import { click, get, type } from "../common/utilities";
import { getCypressTaskRoute } from "../../server/cypress-tasks";
import { cypressConstants } from "../common/cypress-constants";

context("Login", () => {
  const { baseUrl, email, password, name } = cypressConstants;

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.request(
      getCypressTaskRoute(baseUrl, "createUser", { email, password, name })
    );
  });

  it("can log into account and log out", () => {
    type(LoginSelectors.EmailInput, email);
    type(LoginSelectors.PasswordInput, password);
    click(LoginSelectors.SubmitButton);
    click(NavigationSelectors.LogOutLink);
    get(LoginSelectors.SubmitButton).should("exist");
  });
});
