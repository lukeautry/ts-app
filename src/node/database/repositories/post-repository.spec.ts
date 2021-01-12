import {
  createTestPost,
  testPostContent,
  testPostTitle,
} from "../../test/create-test-post";
import { describeIntegration } from "../../test/describe-integration";
import { CommunityRepository } from "./community-repository";
import { PostRepository } from "./post-repository";
import { UserRepository } from "./user-repository";

describeIntegration("PostRepository", () => {
  const repo = new PostRepository();

  describe("create", () => {
    it("should create basic post", async () => {
      const { user, post } = await createTestPost();
      expect(post.title).toEqual(testPostTitle);
      expect(post.content).toEqual(testPostContent);
      expect(post.created_by_id).toEqual(user.id);
    });
  });

  describe("delete", () => {
    it("should be able to delete post", async () => {
      const { post } = await createTestPost();

      await repo.delete({ id: post.id });

      const deletedPost = await repo.findOne({
        where: {
          id: post.id,
        },
      });
      expect(deletedPost).toEqual(undefined);
    });
  });

  describe("relations", () => {
    it("if community deleted, post is deleted", async () => {
      const { post, community } = await createTestPost();

      const communityRepo = new CommunityRepository();
      await communityRepo.delete({ id: community.id });

      const deletedPost = await repo.findById(post.id);
      expect(deletedPost).toEqual(undefined);
    });

    it("if user deleted, created_by_id set to null", async () => {
      const { post, user } = await createTestPost();

      const userRepo = new UserRepository();
      await userRepo.delete({ id: user.id });

      const updatedPost = await repo.findById(post.id);
      expect(updatedPost?.created_by_id).toEqual(null);
    });
  });
});
