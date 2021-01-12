import { ICommunity } from "../database/entities/community";
import { CommunityRepository } from "../database/repositories/community-repository";
import { createTestUser } from "./create-test-user";

export interface ICreateTestCommunityParams {
  name?: string;
  title?: string;
  find?: boolean;
}

export const testCommunityName = "testcommunity";
export const testCommunityTitle = "Test Community";

export const createTestCommunity = async ({
  name = testCommunityName,
  title = testCommunityTitle,
  find = false,
}: ICreateTestCommunityParams = {}) => {
  const repo = new CommunityRepository();

  const user = await createTestUser({
    find: true,
  });

  let community: ICommunity;
  try {
    community = await repo.create({
      name,
      title,
      created_by_id: user.id,
    });
  } catch (err) {
    if (find) {
      community = (await repo.findOne({ where: { name } }))!;
    } else {
      throw err;
    }
  }

  return { user, community };
};
