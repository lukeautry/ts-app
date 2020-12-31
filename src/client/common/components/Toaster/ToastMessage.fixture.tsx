import React from "react";
import styled from "styled-components";
import {
  IToastMessageProps,
  ToastMessage,
  ToastMessageType,
} from "./ToastMessage";

const Container = styled.div`
  padding: 10px;
  background-color: #e9e9e9;
  width: 500px;
  height: 500px;
`;

const renderToastMessages = (props: Omit<IToastMessageProps, "type">) => {
  return (
    <Container>
      {types.map((type) => (
        <div key={type} style={{ marginBottom: "10px" }}>
          <ToastMessage {...props} type={type} />
        </div>
      ))}
    </Container>
  );
};

const types: [ToastMessageType, ToastMessageType, ToastMessageType] = [
  "success",
  "info",
  "error",
];

export default {
  WithTitleOnly: renderToastMessages({
    onClose: () => undefined,
    title: "A default title",
  }),
  WithLongTitle: renderToastMessages({
    onClose: () => undefined,
    title:
      "A default title, a default title, a default title, a default title, a default title",
  }),
  WithSubtitleOnly: renderToastMessages({
    onClose: () => undefined,
    title: "A default title",
    subtitle: "A subtitle with some more text",
  }),
  WithLongSubtitle: renderToastMessages({
    onClose: () => undefined,
    title: "A default title",
    subtitle:
      "A subtitle a subtitle a subtitle a subtitle a subtitle a subtitle a subtitle",
  }),
};
