import React from "react";
import { sleep } from "../../../../common/utils/sleep";
import { ResetPassword } from "./ResetPassword";

export default {
  Default: (
    <ResetPassword
      onBackToLogin={() => undefined}
      onReset={async () => {
        await sleep(1500);
        return { success: true };
      }}
    />
  ),
};
