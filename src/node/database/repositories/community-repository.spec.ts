import { createTestUser } from "../../test/create-test-user";
import { describeIntegration } from "../../test/describe-integration";
import { expectError } from "../../test/expect-error";
import { expectPostgresError } from "../../test/expect-postgres-error";
import { PostgresErrorCode } from "../postgres/postgres-error-codes";
import { CommunityRepository } from "./community-repository";
import { UserRepository } from "./user-repository";

describeIntegration("CommunityRepository", () => {
  const repo = new CommunityRepository();
  const name = "testcommunity";
  const title = "Test Community";

  const createCommunity = async () => {
    const user = await createTestUser();
    const community = await repo.create({
      name,
      title,
      created_by_id: user.id,
    });

    return { user, community };
  };

  describe("create", () => {
    it("should create basic community", async () => {
      const { user, community } = await createCommunity();
      expect(community.name).toEqual(name);
      expect(community.created_by_id).toEqual(user.id);
    });

    it("should reject non-unique name", async () => {
      const { user } = await createCommunity();

      const err = await expectError(() =>
        repo.create({
          name,
          title,
          created_by_id: user.id,
        })
      );
      expectPostgresError(err, PostgresErrorCode.UNIQUE_VIOLATION);
    });
  });

  describe("delete", () => {
    it("should be able to delete community", async () => {
      const { community } = await createCommunity();

      await repo.delete({ id: community.id });

      const deletedCommunity = await repo.findOne({
        where: {
          id: community.id,
        },
      });
      expect(deletedCommunity).toEqual(undefined);
    });
  });

  describe("findOne", () => {
    it("should be able to find community", async () => {
      const { community } = await createCommunity();
      const foundCommunity = await repo.findOne({
        where: { id: community.id },
      });
      expect(foundCommunity).toMatchObject(community);
    });
  });

  describe("find", () => {
    it("should be able to find list of communities", async () => {
      const { community } = await createCommunity();
      const communities = await repo.find({ where: { id: community.id } });
      expect(communities.length).toEqual(1);

      const [foundCommunity] = communities;
      expect(foundCommunity).toMatchObject(community);
    });
  });

  describe("relations", () => {
    it("if user deleted, created_by_id set to null", async () => {
      const { community, user } = await createCommunity();

      const userRepo = new UserRepository();
      await userRepo.delete({ id: user.id });

      const updatedCommunity = await repo.findOne({
        where: { id: community.id },
      });
      expect(updatedCommunity?.created_by_id).toEqual(null);
    });
  });
});
