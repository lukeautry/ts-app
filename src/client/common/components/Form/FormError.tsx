import React from "react";
import styled from "styled-components";
import {
  errorBackground,
  errorBorder,
  errorColor,
  errorFontSize,
  errorMessageMargin,
  formPadding,
  standardBorderRadius,
} from "../../variables";

const Container = styled.div`
  ${formPadding}
  ${errorBackground}
  ${errorMessageMargin}
  ${errorBorder}
  ${errorFontSize}
  ${standardBorderRadius}
  color: ${errorColor};
`;

export const FormError: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
