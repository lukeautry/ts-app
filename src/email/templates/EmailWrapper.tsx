import React from "react";

export const EmailWrapper: React.FC = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};
