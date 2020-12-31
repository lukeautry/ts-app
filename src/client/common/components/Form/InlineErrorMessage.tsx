import React from "react";
import styled from "styled-components";
import { errorColor, errorFontSize } from "../../variables";

const Container = styled.div`
  ${errorFontSize}
  color: ${errorColor};
`;

export const InlineErrorMessage: React.FC = ({ children }) =>
  children ? <Container>{children}</Container> : null;
