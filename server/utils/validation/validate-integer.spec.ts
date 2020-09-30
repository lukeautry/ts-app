import { expect } from "chai";
import { expectAPIError, expectError } from "../../test/utils/expect-error";
import { HttpStatusCode } from "../http-status-code";
import { validateInteger } from "./validate-integer";

describe("validateInteger", () => {
  it("should validate integer", () => {
    validateInteger("param", 123);
  });

  it("should invalidate float", async () => {
    const err = await expectError(async () => validateInteger("param", 123.3));
    expectAPIError(err);
    expect(err.status).to.equal(HttpStatusCode.BAD_REQUEST);
  });
});
