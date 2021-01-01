import { LoginSelectors } from "../../client/App/Unauthenticated/Login/Login.selectors";
import { NavigationSelectors } from "../../client/App/Authenticated/Navigation/Navigation.selectors";
import { click, get, type } from "../common/utilities";

context("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3037");
  });

  it("can log into account and log out", () => {
    type(LoginSelectors.EmailInput, "test@test.com");
    type(LoginSelectors.PasswordInput, "test1234");
    click(LoginSelectors.SubmitButton);
    click(NavigationSelectors.LogOutLink);
    get(LoginSelectors.SubmitButton).should("exist");
  });
});
