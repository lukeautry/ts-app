import React from "react";
import ReactDOMServer from "react-dom/server";
import { EmailWrapper } from "./EmailWrapper";

interface IResetPasswordProps {
  resetUrl: string;
}

export const ResetPassword: React.FC<IResetPasswordProps> = ({ resetUrl }) => {
  return (
    <EmailWrapper>
      <div>
        <div>A request has been sent to reset your password</div>
        <div>
          <a href={resetUrl}>Reset Password</a>
        </div>
      </div>
    </EmailWrapper>
  );
};

export const renderResetPassword = (props: IResetPasswordProps) =>
  ReactDOMServer.renderToStaticMarkup(<ResetPassword {...props} />);
