import { UserRepository } from "../database/repositories/user-repository";

export interface ICreateTestUserParams {
  username?: string;
  email?: string;
  find?: boolean;
}

export const testUsername = "testuser";
export const testUserEmail = "test@test.com";
export const testUserPassword = "test1234";

export const createTestUser = async ({
  username = testUsername,
  email = testUserEmail,
  find = false,
}: ICreateTestUserParams = {}) => {
  try {
    return await new UserRepository().create({
      username,
      email,
    });
  } catch (err) {
    if (find) {
      const user = await new UserRepository().findOne({
        where: { email, username },
      });
      if (user) {
        return user;
      }
    }

    throw err;
  }
};
