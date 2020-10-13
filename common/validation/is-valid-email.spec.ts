import { expect } from "chai";
import { isValidEmail } from "./is-valid-email";

describe("validateEmail", () => {
  interface IValidateTest {
    input: string;
    pass: boolean;
  }

  const tests: IValidateTest[] = [
    { input: "test@test.com", pass: true },
    { input: "@test@test.com", pass: false },
    { input: "testtest.com", pass: false },
    { input: "@testtest.com", pass: false },
  ];

  it("should validate test cases", () => {
    tests.forEach(({ input, pass }) => {
      const result = isValidEmail(input);
      expect(result).to.equal(
        pass,
        `expected ${input} to be ${pass ? "valid" : "invalid"}`
      );
    });
  });
});
