import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { ToastMessage } from "../../common/components/Toaster/ToastMessage";
import { AppContext } from "../AppContext";

const spacing = "10px";

const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  padding: ${spacing} ${spacing} 0 ${spacing};
  background-color: #80808036;
  border-radius: 5px;
`;

const MessageContainer = styled.div`
  margin-bottom: ${spacing};
`;

export const MessageQueue = () => {
  const { messages, removeMessage } = useContext(AppContext);

  if (messages.length) {
    return (
      <Container>
        {messages.map((message, i) => (
          <MessageContainer key={i}>
            <ToastMessage
              type={message.type}
              title={message.title}
              subtitle={message.subtitle}
              onClose={() => removeMessage(message)}
            />
          </MessageContainer>
        ))}
      </Container>
    );
  } else {
    return null;
  }
};
