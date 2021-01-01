import { LoginSelectors } from "../../client/App/Unauthenticated/Login/Login.selectors";
import { NavigationSelectors } from "../../client/App/Authenticated/Navigation/Navigation.selectors";
import { click, get, type } from "../common/utilities";
import { getCypressTaskRoute } from "../../server/cypress-tasks";

context("Login", () => {
  const baseUrl = "http://localhost:3037";
  const email = "test@test.com";
  const password = "test1234";
  const name = "Test User";

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
