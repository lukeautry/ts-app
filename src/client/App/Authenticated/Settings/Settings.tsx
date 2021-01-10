import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getPath } from "../../../../common/paths";
import { DashboardSection } from "../../../common/components/DashboardSection/DashboardSection";
import { DashboardSectionContent } from "../../../common/components/DashboardSection/DashboardSectionContent";
import { DashboardSectionHeader } from "../../../common/components/DashboardSection/DashboardSectionHeader";
import { SecondaryNavigation } from "../../../common/components/SecondaryNavigation/SecondaryNavigation";
import { SecondaryNavigationLink } from "../../../common/components/SecondaryNavigation/SecondaryNavigationLink";
import { WiredChangePassword } from "./ChangePassword/ChangePassword.wired";
import { WiredProfile } from "./Profile/Profile.wired";
import { SettingsSelectors } from "./Settings.selectors";

const SettingsContentContainer = styled.div`
  flex: 1;
`;

export const Settings = () => {
  const profilePath = getPath((p) => p.dashboard.settings.profile);
  const profileMatch = useRouteMatch(profilePath);

  const changePasswordPath = getPath(
    (p) => p.dashboard.settings.changePassword
  );
  const changePasswordMatch = useRouteMatch(changePasswordPath);

  return (
    <DashboardSection>
      <DashboardSectionHeader>Settings</DashboardSectionHeader>
      <DashboardSectionContent>
        <SecondaryNavigation>
          <SecondaryNavigationLink
            href={`#${profilePath}`}
            isActive={profileMatch?.path.includes(profilePath)}
          >
            <span data-testid={SettingsSelectors.ProfileLink}>Profile</span>
          </SecondaryNavigationLink>
          <SecondaryNavigationLink
            href={`#${changePasswordPath}`}
            isActive={changePasswordMatch?.path.includes(changePasswordPath)}
          >
            <span data-testid={SettingsSelectors.ChangePasswordLink}>
              Change Password
            </span>
          </SecondaryNavigationLink>
        </SecondaryNavigation>
        <SettingsContentContainer>
          <Switch>
            <Route path={profilePath} component={WiredProfile} />
            <Route path={changePasswordPath} component={WiredChangePassword} />
            <Route path="/">
              <Redirect to={getPath((p) => p.dashboard.settings.profile)} />
            </Route>
          </Switch>
        </SettingsContentContainer>
      </DashboardSectionContent>
    </DashboardSection>
  );
};
