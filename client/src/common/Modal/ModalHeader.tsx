import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  font-size: 16px;
`;

export const ModalHeader: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
