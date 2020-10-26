import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  min-width: 400px;
`;

export const ModalBody: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
