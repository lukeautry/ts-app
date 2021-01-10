import { UserRepository } from "../database/repositories/user-repository";

export const testUsername = "testuser";
export const testUserEmail = "test@test.com";
export const testUserPassword = "test1234";

export const createTestUser = ({
  username = testUsername,
  email = testUserEmail,
}: { username?: string; email?: string } = {}) =>
  new UserRepository().create({
    username: username,
    email,
  });
