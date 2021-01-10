import { Cog, PowerOff } from "@styled-icons/fa-solid";
import React, { useContext } from "react";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import { getPath } from "../../../../common/paths";
import { AppContext } from "../../AppContext";
import { NavigationBar } from "../../../common/components/Navigation/NavigationBar";
import { NavigationBrand } from "../../../common/components/Navigation/NavigationBrand";
import { NavigationLink } from "../../../common/components/Navigation/NavigationLink";
import { AuthenticatedContext } from "../AuthenticatedContext";
import { NavigationSelectors } from "./Navigation.selectors";

const SecondaryLinkGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const UsernameContainer = styled.div`
  color: white;
  font-size: 12px;
  align-items: center;
  display: flex;
  padding-right: 10px;
`;

export const Navigation = () => {
  const appContext = useContext(AppContext);
  const { user } = useContext(AuthenticatedContext);
  const { username } = user;

  const settingsPath = getPath((p) => p.dashboard.settings);
  const match = useRouteMatch(settingsPath);

  const settingsActive = match?.path.includes(settingsPath);

  return (
    <NavigationBar>
      <NavigationBrand>ts-app</NavigationBrand>
      <SecondaryLinkGroup>
        <UsernameContainer>{username}</UsernameContainer>
        <NavigationLink
          href={`#${settingsPath}`}
          icon={<Cog />}
          isActive={settingsActive}
        >
          Settings
        </NavigationLink>
        <NavigationLink onClick={appContext.onLogOut} icon={<PowerOff />}>
          <span data-testid={NavigationSelectors.LogOutLink}>Log Out</span>
        </NavigationLink>
      </SecondaryLinkGroup>
    </NavigationBar>
  );
};
