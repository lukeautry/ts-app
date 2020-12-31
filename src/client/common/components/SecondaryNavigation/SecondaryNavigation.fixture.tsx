import React from "react";
import styled from "styled-components";
import { SecondaryNavigation } from "./SecondaryNavigation";
import { SecondaryNavigationLink } from "./SecondaryNavigationLink";

const Container = styled.div`
  padding: 10px;
`;

export default {
  Default: (
    <Container>
      <SecondaryNavigation>
        <SecondaryNavigationLink>Link 1</SecondaryNavigationLink>
        <SecondaryNavigationLink isActive={true}>
          Link 2
        </SecondaryNavigationLink>
        <SecondaryNavigationLink>Link 3</SecondaryNavigationLink>
      </SecondaryNavigation>
    </Container>
  ),
};
