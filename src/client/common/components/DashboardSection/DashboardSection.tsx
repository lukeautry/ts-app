import React from "react";
import styled from "styled-components";
import { Card } from "../../../common/components/Card/Card";

const Container = styled.div`
  padding: 10px;
  height: 100%;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const DashboardSection: React.FC = ({ children }) => (
  <Container>
    <StyledCard>{children}</StyledCard>
  </Container>
);
