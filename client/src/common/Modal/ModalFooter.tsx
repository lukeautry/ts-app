import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;

  button:not(:first-child) {
    margin-left: 10px;
  }
`;

export const ModalFooter: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
