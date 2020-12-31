import { validatePasswordRequirements } from "./validate-password-requirements";

describe("validatePasswordRequirements", () => {
  const testCases = [
    {
      password: "abc1234",
      isValid: false,
    },
    {
      password: "abcdefgh",
      isValid: false,
    },
    {
      password: "abcd1234",
      isValid: true,
    },
  ];

  it("should validate correctly", () => {
    testCases.forEach(({ password, isValid }) => {
      const result = validatePasswordRequirements(password);
      expect(result.success).toEqual(isValid);
    });
  });
});
