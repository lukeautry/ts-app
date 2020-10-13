import React from "react";
import styled from "styled-components";

const colors = {
  primary: `
    background-color: #55aeff;
    color: white;
    border: none;

    &:hover {
      filter: brightness(1.15);
    }
  `,
  cancel: `
    background-color: #f8f8f8;
    border: 1px solid #dfdfdf;

    &:hover {
      background-color: #e1e1e1;
    }
  `,
} as const;

type ModalButtonColor = keyof typeof colors;

interface IModalButton {
  onClick?: () => void;
  bgColor: ModalButtonColor;
}

const Container = styled.button<IModalButton>`
  cursor: pointer;
  padding: 10px;
  ${(props) => colors[props.bgColor]}
`;

export const ModalButton: React.FC<IModalButton> = (props) => (
  <Container {...props}>{props.children}</Container>
);
