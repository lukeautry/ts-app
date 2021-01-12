import { ICommunity } from "../database/entities/community";
import { IPost } from "../database/entities/post";
import { IUser } from "../database/entities/user";
import { CommentRepository } from "../database/repositories/comment-repository";
import { CommunityRepository } from "../database/repositories/community-repository";
import { UserRepository } from "../database/repositories/user-repository";
import { createTestPost } from "./create-test-post";

export interface ICreateTestCommentParams {
  parentId: number | null;
  content?: string;
  post?: IPost;
}

export const testCommentContent = "Test Content";

export const createTestComment = async ({
  parentId,
  content = testCommentContent,
  post,
}: ICreateTestCommentParams) => {
  let user: IUser;
  let community: ICommunity;
  if (post) {
    user = (await new UserRepository().findById(post.created_by_id!))!;
    community = (await new CommunityRepository().findById(post.community_id))!;
  } else {
    ({ user, community, post } = await createTestPost());
  }

  const comment = await new CommentRepository().create({
    content,
    parent_id: parentId,
    post_id: post.id,
    created_by_id: user.id,
  });

  return {
    user,
    community,
    post,
    comment,
  };
};
