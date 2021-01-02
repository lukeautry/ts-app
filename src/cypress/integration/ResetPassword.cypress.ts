import { LoginSelectors } from "../../client/App/Unauthenticated/Login/Login.selectors";
import { click, type } from "../common/utilities";
import { getCypressTaskRoute } from "../../server/cypress-tasks";
import { cypressConstants } from "../common/cypress-constants";
import { ForgotPasswordSelectors } from "../../client/App/Unauthenticated/ForgotPassword/ForgotPassword.selectors";
import { ResetPasswordSelectors } from "../../client/App/Unauthenticated/ResetPassword/ResetPassword.selectors";
import { NavigationSelectors } from "../../client/App/Authenticated/Navigation/Navigation.selectors";

context("ResetPassword", () => {
  const { baseUrl, email, password, name } = cypressConstants;
  const newPassword = "test12345";

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.request(
      getCypressTaskRoute(baseUrl, "createUser", { email, password, name })
    );
  });

  it("can reset password and set new password", () => {
    click(LoginSelectors.ForgotPasswordLink);
    type(ForgotPasswordSelectors.EmailInput, email);
    click(ForgotPasswordSelectors.SubmitButton);

    cy.request(
      getCypressTaskRoute(baseUrl, "getResetPasswordUrl", { email })
    ).then((response) => {
      const { url } = response.body;

      cy.visit(url);

      type(ResetPasswordSelectors.PasswordInput, newPassword);
      type(ResetPasswordSelectors.ConfirmPasswordInput, newPassword);
      click(ResetPasswordSelectors.SubmitButton);
      click(NavigationSelectors.LogOutLink);

      type(LoginSelectors.EmailInput, email);
      type(LoginSelectors.PasswordInput, newPassword);
      click(LoginSelectors.SubmitButton);
      click(NavigationSelectors.LogOutLink);
    });
  });
});
