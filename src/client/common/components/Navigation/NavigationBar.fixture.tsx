import { PowerOff, Archive, Satellite } from "@styled-icons/fa-solid";
import React from "react";
import styled from "styled-components";
import { NavigationBar } from "./NavigationBar";
import { NavigationBrand } from "./NavigationBrand";
import { NavigationLink } from "./NavigationLink";

const Container = styled.div`
  display: flex;
`;

export default {
  Default: (
    <Container>
      <NavigationBar>
        <NavigationBrand>Brand</NavigationBrand>
        <NavigationLink icon={<Satellite />}>Section 1</NavigationLink>
        <NavigationLink icon={<PowerOff />}>Section 2</NavigationLink>
        <NavigationLink icon={<Archive />}>Section 3</NavigationLink>
      </NavigationBar>
    </Container>
  ),
};
