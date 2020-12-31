import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  font-size: 12px;
  padding-top: 5px;
`;

const FlexEndContainer = styled(Container)`
  justify-content: flex-end;
`;

const SpaceBetweenContainer = styled(Container)`
  justify-content: space-between;
`;

export const FormLinks: React.FC = ({ children }) =>
  Array.isArray(children) ? (
    <SpaceBetweenContainer>{children}</SpaceBetweenContainer>
  ) : (
    <FlexEndContainer>{children}</FlexEndContainer>
  );
