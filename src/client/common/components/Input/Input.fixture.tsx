import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "./Input";

const Container = styled.div`
  width: 500px;
  padding: 10px;
`;

export default {
  Default: () => {
    const [value, setValue] = useState("");

    return (
      <Container>
        <Input
          placeholder="Placeholder"
          value={value}
          onChange={(v) => setValue(v)}
        />
      </Container>
    );
  },
};
