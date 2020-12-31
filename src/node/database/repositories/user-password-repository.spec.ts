import { PostgresErrorCode } from "../postgres/postgres-error-codes";
import { expectError } from "../../test/expect-error";
import { expectPostgresError } from "../../test/expect-postgres-error";
import { createTestUser } from "../../test/create-test-user";
import { describeIntegration } from "../../test/describe-integration";
import { UserRepository } from "./user-repository";
import { UserPasswordRepository } from "./user-password-repository";

describeIntegration("UserPasswordRepository", () => {
  const repo = new UserPasswordRepository();

  describe("create", () => {
    it("should reject if user doesn't exist", async () => {
      const err = await expectError(() =>
        repo.create({
          user_id: 1234,
          hash: "1234",
        })
      );
      expectPostgresError(err, PostgresErrorCode.FOREIGN_KEY_VIOLATION);
    });

    it("should allow creation if user exists", async () => {
      const hash = "1234";

      const user = await createTestUser();
      const result = await repo.create({
        user_id: user.id,
        hash,
      });
      expect(result.hash).toEqual(hash);
      await validateCascadeBehavior(user.id, result.id);
    });

    const validateCascadeBehavior = async (
      userId: number,
      userPasswordId: number
    ) => {
      await new UserRepository().delete({
        id: userId,
      });

      const result = await repo.findOne({
        where: {
          id: userPasswordId,
        },
      });
      expect(result).toEqual(undefined);
    };
  });
});
