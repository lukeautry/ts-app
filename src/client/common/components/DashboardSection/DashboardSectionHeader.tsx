import React from "react";
import styled from "styled-components";
import { lightBorderColor } from "../../variables";
import { dashboardSectionVariables } from "./dashboard-section-variables";

const Container = styled.div`
  padding: ${dashboardSectionVariables.sidePadding}
    ${dashboardSectionVariables.sidePadding} 5px;
  font-size: 20px;
  border-bottom: 1px solid ${lightBorderColor};
`;

const InnerContainer = styled.div`
  color: #505050;
  letter-spacing: 1px;
  padding-bottom: 5px;
`;

export const DashboardSectionHeader: React.FC = ({ children }) => (
  <Container>
    <InnerContainer>{children}</InnerContainer>
  </Container>
);
