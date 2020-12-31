import React from "react";
import { Try } from "../../../../common/try";
import { sleep } from "../../../../common/utils/sleep";
import { Login } from "./Login";

const LoginFixture = (result: Try) => (
  <Login
    onLogin={async () => {
      await sleep(1500);
      return result;
    }}
    onForgotPassword={() => undefined}
    onRegister={() => undefined}
  />
);

export default {
  Default: LoginFixture({ success: true }),
  Failure: LoginFixture({ success: false, error: "An error occurred" }),
};
