import { click, get, logIntoApp, type } from "../common/utilities";
import { SettingsSelectors } from "../../client/App/Authenticated/Settings/Settings.selectors";
import { NavigationSelectors } from "../../client/App/Authenticated/Navigation/Navigation.selectors";
import { LoginSelectors } from "../../client/App/Unauthenticated/Login/Login.selectors";
import { cypressConstants } from "../common/cypress-constants";
import { ProfileSelectors } from "../../client/App/Authenticated/Settings/Profile/Profile.selectors";

context("EditProfile", () => {
  const newEmail = "test2@test.com";
  const newName = "Test Name Changed";
  const { password } = cypressConstants;

  beforeEach(() => {
    logIntoApp();
  });

  it("can update profile", () => {
    click(SettingsSelectors.ProfileLink);
    type(ProfileSelectors.EmailInput, newEmail);
    type(ProfileSelectors.NameInput, newName);
    click(ProfileSelectors.SaveButton);

    click(NavigationSelectors.LogOutLink);

    type(LoginSelectors.EmailInput, newEmail);
    type(LoginSelectors.PasswordInput, password);
    click(LoginSelectors.SubmitButton);

    click(SettingsSelectors.ProfileLink);
    get(ProfileSelectors.EmailInput).should("have.value", newEmail);
    get(ProfileSelectors.NameInput).should("have.value", newName);

    click(NavigationSelectors.LogOutLink);
  });
});
