import React from "react";
import { Try } from "../../../../common/try";
import { sleep } from "../../../../common/utils/sleep";
import { Register } from "./Register";

const RegisterFixture = (result: Try) => (
  <Register
    onRegister={async () => {
      await sleep(1500);
      return result;
    }}
    onBackToLogin={() => undefined}
  />
);

export default {
  Default: RegisterFixture({ success: true }),
  Failure: RegisterFixture({ success: false, error: "Register failed" }),
};
