import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Login } from "./Login";
import { LoginSelectors } from "./Login.selectors";

describe("Login", () => {
  const username = "testuser";
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

    fireEvent.change(result.getByTestId(LoginSelectors.UsernameInput), {
      target: { value: username },
    });
    fireEvent.change(result.getByTestId(LoginSelectors.PasswordInput), {
      target: { value: password },
    });

    fireEvent.click(result.getByTestId(LoginSelectors.SubmitButton));

    await waitFor(() =>
      expect(onLogin).toHaveBeenCalledWith({ username, password })
    );
  });
});
