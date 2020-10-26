import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000040;
`;

const ModalContentContainer = styled.div`
  background-color: white;
`;

interface IModalProps {
  onClose: () => void;
}

export const Modal: React.FC<IModalProps> = (props) => {
  return (
    <ModalWrapper>
      <ModalContentContainer>{props.children}</ModalContentContainer>
    </ModalWrapper>
  );
};
