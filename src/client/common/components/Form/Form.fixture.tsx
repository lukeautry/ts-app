import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "../Link/Link";
import { InlineErrorMessage } from "./InlineErrorMessage";
import { Form } from "./Form";
import { FormInput } from "./FormInput";
import { FormSubmitButton } from "./FormSubmitButton";
import { FormError } from "./FormError";
import { FormLinks } from "./FormLinks";

const FormContainer = styled.div`
  width: 400px;
`;

const FixtureForm = ({
  firstError,
  secondError,
  rootError,
}: {
  firstError?: string;
  secondError?: string;
  rootError?: string;
}) => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  return (
    <FormContainer>
      <Form>
        <FormInput
          label="First Input"
          placeholder="First Input"
          value={first}
          onChange={(val) => setFirst(val)}
          hasError={!!firstError}
          secondaryLabel={<InlineErrorMessage>{firstError}</InlineErrorMessage>}
        />
        <FormInput
          label="Second Input"
          placeholder="Second Input"
          value={second}
          onChange={(val) => setSecond(val)}
          hasError={!!firstError}
          secondaryLabel={
            <InlineErrorMessage>{secondError}</InlineErrorMessage>
          }
        />
        <FormSubmitButton>Submit</FormSubmitButton>
        <FormLinks>
          <Link>A little link</Link>
        </FormLinks>
        {rootError && <FormError>{rootError}</FormError>}
      </Form>
    </FormContainer>
  );
};

export default {
  Default: () => <FixtureForm />,
  WithError: () => {
    return (
      <FixtureForm
        firstError="This is an error"
        secondError="This is another error"
      />
    );
  },
  WithRootError: () => {
    return (
      <FixtureForm rootError="An error occurred that impacts the entire form" />
    );
  },
};
