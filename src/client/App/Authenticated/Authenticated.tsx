import React from "react";
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { getPath } from "../../../common/paths";
import { IUser } from "../../../openapi-client/out";
import { AuthenticatedContext } from "./AuthenticatedContext";
import { Dashboard } from "./Dashboard";

interface IAuthenticatedProps {
  user: IUser;
}

export const Authenticated: React.FC<IAuthenticatedProps> = (props) => {
  return (
    <AuthenticatedContext.Provider value={props}>
      <Router>
        <Switch>
          <Route path={getPath((p) => p.dashboard)} component={Dashboard} />
          <Route path="/">
            <Redirect to={getPath((p) => p.dashboard)} />
          </Route>
        </Switch>
      </Router>
    </AuthenticatedContext.Provider>
  );
};
