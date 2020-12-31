import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getPath } from "../../../common/paths";
import { WiredForgotPassword } from "./ForgotPassword/ForgotPassword.wired";
import { WiredLogin } from "./Login/Login.wired";
import { WiredRegister } from "./Register/Register.wired";

export const UnauthenticatedRouter = () => (
  <Router>
    <Switch>
      <Route path={getPath((p) => p.register)} component={WiredRegister} />
      <Route path={getPath((p) => p.login)} component={WiredLogin} />
      <Route
        path={getPath((p) => p.forgotPassword)}
        component={WiredForgotPassword}
      />
      <Route path="/">
        <Redirect to={getPath((p) => p.login)} />
      </Route>
    </Switch>
  </Router>
);
