import React from "react";
import { ResetPassword } from "./ResetEmail";

const template = <T>(
  component: T,
  defaultProps: T extends React.FC<infer P> ? P : never
) => {
  return {
    component,
    defaultProps,
  };
};

export const templates: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { component: React.FC<any>; defaultProps: any }
> = {
  "reset-password": template(ResetPassword, {
    resetUrl: "https://www.google.com",
  }),
};
