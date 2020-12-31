import { PostgresErrorCode } from "../postgres/postgres-error-codes";
import { VerificationTokenType } from "../entities/verification-token";
import { expectError } from "../../test/expect-error";
import { expectPostgresError } from "../../test/expect-postgres-error";
import { createTestUser } from "../../test/create-test-user";
import { describeIntegration } from "../../test/describe-integration";
import { VerificationTokenRepository } from "./verification-token-repository";
import { UserRepository } from "./user-repository";

describeIntegration("VerificationTokenRepository", () => {
  const repo = new VerificationTokenRepository();

  describe("create", () => {
    it("should reject without valid user id", async () => {
      const err = await expectError(() =>
        repo.create({
          date_expires: new Date(),
          user_id: 1234,
          type: "reset_password",
          value: "abc1234",
          consumed: false,
        })
      );
      expectPostgresError(err, PostgresErrorCode.FOREIGN_KEY_VIOLATION);
    });

    it("should reject without valid type", async () => {
      const user = await createTestUser();

      const err = await expectError(() =>
        repo.create({
          date_expires: new Date(),
          user_id: user.id,
          type: "fake_type" as VerificationTokenType,
          value: "abc1234",
          consumed: false,
        })
      );
      expectPostgresError(err, PostgresErrorCode.INVALID_TEXT_REPRESENTATION);
    });

    it("should succeed with valid parameters", async () => {
      const user = await createTestUser();

      const token = await repo.create({
        date_expires: new Date(),
        user_id: user.id,
        type: "reset_password",
        value: "abc1234",
        consumed: false,
      });

      // verify cascade behavior
      await new UserRepository().delete({ id: user.id });

      const result = await repo.findOne({ where: { id: token.id } });
      expect(result).toEqual(undefined);
    });
  });
});
