import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Login, LoginSelectors } from "./Login";

describe("Login", () => {
  const email = "test@test.com";
  const password = "test-password";

  it("should call back with expected params", async () => {
    const onLogin = jest.fn(() =>
      Promise.resolve({
        success: true,
      } as const)
    );

    const result = render(
      <Login
        onLogin={onLogin}
        onForgotPassword={jest.fn()}
        onRegister={jest.fn()}
      />
    );

    fireEvent.change(result.getByTestId(LoginSelectors.EmailInput), {
      target: { value: email },
    });
    fireEvent.change(result.getByTestId(LoginSelectors.PasswordInput), {
      target: { value: password },
    });

    fireEvent.click(result.getByTestId(LoginSelectors.SubmitButton));

    await waitFor(() =>
      expect(onLogin).toHaveBeenCalledWith({ email, password })
    );
  });
});
