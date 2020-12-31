import React from "react";
import styled from "styled-components";
import { Times } from "@styled-icons/fa-solid";
import {
  errorColor,
  infoColor,
  subduedText,
  successColor,
} from "../../variables";

export type ToastMessageType = "success" | "info" | "error";

export interface IToastMessageProps {
  type: ToastMessageType;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

const colors: Record<ToastMessageType, string> = {
  success: successColor,
  info: infoColor,
  error: errorColor,
};

const Container = styled.div<{ messageType: ToastMessageType }>`
  display: flex;
  width: 320px;
  padding: 10px;
  background-color: #f0f0f0;
  box-shadow: 1px 1px 1px 0px #d4d4d4;
  border-radius: 0px 5px 5px 0px;
  border-left: 4px solid ${(props) => colors[props.messageType]};
`;

const TitlesContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding-right: 10px;
`;

const CloseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`;

const CloseIcon = styled(Times)`
  color: ${subduedText};
  font-size: 12px;
  width: 8px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.25);
  }
`;

const Title = styled.div`
  font-size: 14px;
`;

const Subtitle = styled.div`
  font-size: 10px;
  color: ${subduedText};
  margin-top: 2px;
`;

export const ToastMessage: React.FC<IToastMessageProps> = ({
  type,
  title,
  subtitle,
  onClose,
}) => {
  return (
    <Container messageType={type}>
      <TitlesContainer>
        <div>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </div>
      </TitlesContainer>
      <CloseContainer>
        <CloseIcon onClick={onClose} />
      </CloseContainer>
    </Container>
  );
};
