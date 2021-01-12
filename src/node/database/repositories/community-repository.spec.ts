import {
  createTestCommunity,
  testCommunityName,
  testCommunityTitle,
} from "../../test/create-test-community";
import { describeIntegration } from "../../test/describe-integration";
import { expectError } from "../../test/expect-error";
import { expectPostgresError } from "../../test/expect-postgres-error";
import { PostgresErrorCode } from "../postgres/postgres-error-codes";
import { CommunityRepository } from "./community-repository";
import { UserRepository } from "./user-repository";

describeIntegration("CommunityRepository", () => {
  const repo = new CommunityRepository();

  describe("create", () => {
    it("should create basic community", async () => {
      const { user, community } = await createTestCommunity();
      expect(community.name).toEqual(testCommunityName);
      expect(community.created_by_id).toEqual(user.id);
    });

    it("should reject non-unique name", async () => {
      const { user } = await createTestCommunity();

      const err = await expectError(() =>
        repo.create({
          name: testCommunityName,
          title: testCommunityTitle,
          created_by_id: user.id,
        })
      );
      expectPostgresError(err, PostgresErrorCode.UNIQUE_VIOLATION);
    });
  });

  describe("delete", () => {
    it("should be able to delete community", async () => {
      const { community } = await createTestCommunity();

      await repo.delete({ id: community.id });

      const deletedCommunity = await repo.findOne({
        where: {
          id: community.id,
        },
      });
      expect(deletedCommunity).toEqual(undefined);
    });
  });

  describe("relations", () => {
    it("if user deleted, created_by_id set to null", async () => {
      const { community, user } = await createTestCommunity();

      const userRepo = new UserRepository();
      await userRepo.delete({ id: user.id });

      const updatedCommunity = await repo.findById(community.id);
      expect(updatedCommunity?.created_by_id).toEqual(null);
    });
  });
});
