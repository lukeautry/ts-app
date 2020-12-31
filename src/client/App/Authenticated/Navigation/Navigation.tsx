import {
  Angry,
  Archive,
  ArrowAltCircleUp,
  Cog,
  PowerOff,
} from "@styled-icons/fa-solid";
import React, { useContext } from "react";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import { getPath } from "../../../../common/paths";
import { AppContext } from "../../AppContext";
import { NavigationBar } from "../../../common/components/Navigation/NavigationBar";
import { NavigationBrand } from "../../../common/components/Navigation/NavigationBrand";
import { NavigationLink } from "../../../common/components/Navigation/NavigationLink";
import { UserChip } from "../../../common/components/UserChip/UserChip";
import { AuthenticatedContext } from "../AuthenticatedContext";

const PrimaryLinkGroup = styled.div`
  flex-grow: 1;
`;

const SecondaryLinkGroup = styled.div`
  margin-bottom: 10px;
`;

export const Navigation = () => {
  const appContext = useContext(AppContext);
  const { user } = useContext(AuthenticatedContext);
  const { name, email } = user;

  const settingsPath = getPath((p) => p.dashboard.settings);
  const match = useRouteMatch(settingsPath);

  const settingsActive = match?.path.includes(settingsPath);

  return (
    <NavigationBar>
      <NavigationBrand>ts-app</NavigationBrand>
      <PrimaryLinkGroup>
        <NavigationLink icon={<Archive />}>Section 1</NavigationLink>
        <NavigationLink icon={<Angry />}>Section 2</NavigationLink>
        <NavigationLink icon={<ArrowAltCircleUp />}>Section 3</NavigationLink>
      </PrimaryLinkGroup>
      <SecondaryLinkGroup>
        <UserChip email={email} name={name} />
        <NavigationLink
          href={`#${settingsPath}`}
          icon={<Cog />}
          isActive={settingsActive}
        >
          Settings
        </NavigationLink>
        <NavigationLink onClick={appContext.onLogOut} icon={<PowerOff />}>
          Log Out
        </NavigationLink>
      </SecondaryLinkGroup>
    </NavigationBar>
  );
};
