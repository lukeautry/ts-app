import React from "react";
import styled from "styled-components";
import { dashboardSectionVariables } from "./dashboard-section-variables";

const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 0 ${dashboardSectionVariables.sidePadding};
`;

export const DashboardSectionContent: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
