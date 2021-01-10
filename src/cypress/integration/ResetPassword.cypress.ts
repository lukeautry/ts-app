import { LoginSelectors } from "../../client/App/Unauthenticated/Login/Login.selectors";
import { click, type } from "../common/utilities";
import { getCypressTaskRoute } from "../../server/routes/get-cypress-task-route";
import { cypressConstants } from "../common/cypress-constants";
import { ForgotPasswordSelectors } from "../../client/App/Unauthenticated/ForgotPassword/ForgotPassword.selectors";
import { ResetPasswordSelectors } from "../../client/App/Unauthenticated/ResetPassword/ResetPassword.selectors";
import { NavigationSelectors } from "../../client/App/Authenticated/Navigation/Navigation.selectors";
import { ResetEmailSelectors } from "../../email/templates/ResetEmail.selectors";

context("ResetPassword", () => {
  const { baseUrl, username, email, password } = cypressConstants;
  const newPassword = "test12345";

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

  it("can reset password and set new password", () => {
    click(LoginSelectors.ForgotPasswordLink);
    type(ForgotPasswordSelectors.EmailInput, email);
    click(ForgotPasswordSelectors.SubmitButton);

    cy.request(
      getCypressTaskRoute(baseUrl, "getResetPasswordEmailUrl", { email })
    ).then((response) => {
      const { url } = response.body;
      cy.visit(url);

      click(ResetEmailSelectors.ResetLink);

      type(ResetPasswordSelectors.PasswordInput, newPassword);
      type(ResetPasswordSelectors.ConfirmPasswordInput, newPassword);
      click(ResetPasswordSelectors.SubmitButton);
      click(NavigationSelectors.LogOutLink);

      type(LoginSelectors.UsernameInput, username);
      type(LoginSelectors.PasswordInput, newPassword);
      click(LoginSelectors.SubmitButton);
      click(NavigationSelectors.LogOutLink);
    });
  });
});
