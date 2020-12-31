import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { getPath } from "../../../common/paths";
import { Navigation } from "./Navigation/Navigation";
import { Settings } from "./Settings/Settings";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

export const Dashboard = () => {
  return (
    <Container>
      <Navigation />
      <ContentContainer>
        <Switch>
          <Route
            path={getPath((p) => p.dashboard.settings)}
            component={Settings}
          ></Route>
          <Route path="/">
            <Redirect to={getPath((p) => p.dashboard.settings)} />
          </Route>
        </Switch>
      </ContentContainer>
    </Container>
  );
};
