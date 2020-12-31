import { UserRepository } from "../database/repositories/user-repository";

export const testUserEmail = "test@test.com";
export const testUserName = "First Last";
export const testUserPassword = "test1234";

export const createTestUser = ({
  email = testUserEmail,
  name = testUserName,
}: { email?: string; name?: string } = {}) =>
  new UserRepository().create({
    email,
    name,
  });
