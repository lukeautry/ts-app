import { getCypressTaskRoute } from "../../server/cypress-tasks";
import { setAccessToken } from "../../client/App/common/access-token-cache";
import { click, get, type } from "../common/utilities";
import { SettingsSelectors } from "../../client/App/Authenticated/Settings/Settings.selectors";
import { ChangePasswordSelectors } from "../../client/App/Authenticated/Settings/ChangePassword.selectors";
import { NavigationSelectors } from "../../client/App/Authenticated/Navigation/Navigation.selectors";
import { LoginSelectors } from "../../client/App/Unauthenticated/Login/Login.selectors";

context("ChangePassword", () => {
  const baseUrl = "http://localhost:3037";
  const email = "test@test.com";
  const password = "test1234";
  const newPassword = "test12345";
  const name = "Test User";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.request(
      getCypressTaskRoute(baseUrl, "createUser", { email, password, name })
    ).then((response) => {
      setAccessToken(response.body.value);
      return cy.reload();
    });
  });

  it("can change password", () => {
    click(SettingsSelectors.ChangePasswordLink);
    type(ChangePasswordSelectors.PasswordInput, password);
    type(ChangePasswordSelectors.NewPasswordInput, newPassword);
    type(ChangePasswordSelectors.ConfirmNewPasswordInput, newPassword);
    click(ChangePasswordSelectors.SaveButton);
    click(NavigationSelectors.LogOutLink);
    type(LoginSelectors.EmailInput, email);
    type(LoginSelectors.PasswordInput, newPassword);
    click(LoginSelectors.SubmitButton);
    click(NavigationSelectors.LogOutLink);
    get(LoginSelectors.SubmitButton).should("exist");
  });
});
