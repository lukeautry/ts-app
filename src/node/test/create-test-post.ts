import { PostRepository } from "../database/repositories/post-repository";
import { createTestCommunity } from "./create-test-community";

export interface ICreateTestPostParams {
  title?: string;
  content?: string;
}

export const testPostTitle = "Test Post";
export const testPostContent = "Test Content";

export const createTestPost = async ({
  title = testPostTitle,
  content = testPostContent,
}: ICreateTestPostParams = {}) => {
  const { user, community } = await createTestCommunity({ find: true });

  const post = await new PostRepository().create({
    title,
    content,
    community_id: community.id,
    created_by_id: user.id,
  });

  return { user, community, post };
};
