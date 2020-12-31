import React from "react";
import { sleep } from "../../../../common/utils/sleep";
import { ForgotPassword } from "./ForgotPassword";

export default {
  Default: (
    <ForgotPassword
      onSendReset={async () => {
        await sleep(1500);
        return { success: true };
      }}
      onBackToLogin={() => undefined}
    />
  ),
};
