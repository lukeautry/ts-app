import {
  createTestComment,
  testCommentContent,
} from "../../test/create-test-comment";
import { describeIntegration } from "../../test/describe-integration";
import { expectError } from "../../test/expect-error";
import { expectPostgresError } from "../../test/expect-postgres-error";
import { PostgresErrorCode } from "../postgres/postgres-error-codes";
import { range } from "../../../common/utils/range";
import { IPost } from "../entities/post";
import { CommentRepository } from "./comment-repository";
import { PostRepository } from "./post-repository";
import { UserRepository } from "./user-repository";

describeIntegration("CommentRepository", () => {
  const repo = new CommentRepository();

  const createRootComment = async (params: { post?: IPost } = {}) => {
    const { comment: rootComment, post } = await createTestComment({
      parentId: null,
      post: params.post,
    });

    return { rootComment, post };
  };

  const createMultipleChildComments = async (
    count: number,
    parentId: number | null,
    root: IPost
  ) => {
    return Promise.all(
      range(count, async (index) => {
        return await createTestComment({
          parentId,
          post: root,
          content: `content ${index}`,
        });
      })
    );
  };

  describe("create", () => {
    it("should create basic root level comment", async () => {
      const { comment, post } = await createTestComment({ parentId: null });
      expect(comment.post_id).toEqual(post.id);
      expect(comment.parent_id).toEqual(null);
      expect(comment.content).toEqual(testCommentContent);
    });

    it("should be able to create child comments", async () => {
      const { rootComment, post } = await createRootComment();

      const results = await createMultipleChildComments(
        2,
        rootComment.id,
        post
      );
      results.forEach(({ comment }) => {
        expect(comment.post_id).toEqual(post.id);
        expect(comment.parent_id).toEqual(rootComment.id);
      });
    });

    it("should reject parent comment that is not in the same post", async () => {
      const { post: firstPost } = await createTestComment({
        parentId: null,
      });

      const { comment: secondParentComment } = await createTestComment({
        parentId: null,
      });

      const err = await expectError(() =>
        createTestComment({
          parentId: secondParentComment.id,
          post: firstPost,
        })
      );

      expectPostgresError(err, PostgresErrorCode.FOREIGN_KEY_VIOLATION);
    });
  });

  describe("delete", () => {
    it("should be able to delete comment", async () => {
      const { comment } = await createTestComment({ parentId: null });

      await repo.delete({ id: comment.id });

      const foundComment = await repo.findById(comment.id);
      expect(foundComment).toEqual(undefined);
    });

    it("should cascade delete child comments when root comment is deleted", async () => {
      const { rootComment, post } = await createRootComment();
      const { comment } = await createTestComment({
        parentId: rootComment.id,
        post,
      });

      await repo.delete({ id: rootComment.id });

      const foundComment = await repo.findById(comment.id);
      expect(foundComment).toBeUndefined();
    });
  });

  describe("update", () => {
    it("should be able to change child comment to root level comment", async () => {
      const { rootComment, post } = await createRootComment();

      const { comment } = await createTestComment({
        parentId: rootComment.id,
        post,
        content: `content child`,
      });

      const result = await repo.update({
        ...comment,
        parent_id: null,
      });
      expect(result.parent_id).toEqual(null);
    });

    it("should be able to move child comment to a different root level comment", async () => {
      const { rootComment, post } = await createRootComment();

      const { comment } = await createTestComment({
        parentId: rootComment.id,
        post,
        content: `content child`,
      });

      const { rootComment: secondRootComment } = await createRootComment({
        post,
      });

      const result = await repo.update({
        ...comment,
        parent_id: secondRootComment.id,
      });
      expect(result.parent_id).toEqual(secondRootComment.id);
    });

    it("should not be able to move a child comment to a root level comment on a different post", async () => {
      const { rootComment: firstRootComment, post } = await createRootComment();
      const { rootComment: secondRootComment } = await createRootComment();
      const { comment: childComment } = await createTestComment({
        parentId: firstRootComment.id,
        post,
      });

      const parentIdError = await expectError(() =>
        repo.update({
          ...childComment,
          parent_id: secondRootComment.id,
        })
      );
      expectPostgresError(
        parentIdError,
        PostgresErrorCode.FOREIGN_KEY_VIOLATION
      );

      // shouldn't be able to change the post_id either
      const postIdError = await expectError(() =>
        repo.update({
          ...childComment,
          post_id: secondRootComment.post_id,
        })
      );
      expectPostgresError(postIdError, PostgresErrorCode.FOREIGN_KEY_VIOLATION);
    });
  });

  describe("relations", () => {
    it("should cascade delete root comments when post is deleted", async () => {
      const { rootComment, post } = await createRootComment();

      await new PostRepository().delete({ id: post.id });

      const foundRootComment = await repo.findById(rootComment.id);
      expect(foundRootComment).toBeUndefined();
    });

    it("should set created_by_id to null if user deleted", async () => {
      const { rootComment } = await createRootComment();

      await new UserRepository().delete({ id: rootComment.created_by_id! });

      const foundComment = await repo.findById(rootComment.id);
      expect(foundComment?.created_by_id).toBeNull();
    });
  });
});
