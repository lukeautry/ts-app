import { isValidEmail } from "./is-valid-email";

describe("isValidEmail", () => {
  const tests = [
    { input: "test@test.com", pass: true },
    { input: "@test@test.com", pass: false },
    { input: "testtest.com", pass: false },
    { input: "@testtest.com", pass: false },
  ];

  it("should validate test cases", () => {
    tests.forEach(({ input, pass }) => {
      const result = isValidEmail(input);
      expect(result).toEqual(pass);
    });
  });
});
