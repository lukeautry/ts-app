import { click, get, logIntoApp, type } from "../common/utilities";
import { SettingsSelectors } from "../../client/App/Authenticated/Settings/Settings.selectors";
import { ChangePasswordSelectors } from "../../client/App/Authenticated/Settings/ChangePassword/ChangePassword.selectors";
import { NavigationSelectors } from "../../client/App/Authenticated/Navigation/Navigation.selectors";
import { LoginSelectors } from "../../client/App/Unauthenticated/Login/Login.selectors";
import { cypressConstants } from "../common/cypress-constants";

context("ChangePassword", () => {
  const newPassword = "test12345";
  const { password, email } = cypressConstants;

  beforeEach(() => {
    logIntoApp();
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
