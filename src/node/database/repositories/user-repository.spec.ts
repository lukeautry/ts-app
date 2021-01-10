import { describeIntegration } from "../../test/describe-integration";
import { expectError } from "../../test/expect-error";
import { expectPostgresError } from "../../test/expect-postgres-error";
import { PostgresErrorCode } from "../postgres/postgres-error-codes";
import { UserRepository } from "./user-repository";

describeIntegration("UserRepository", () => {
  const repo = new UserRepository();
  const username = "testuser";
  const email = "test@test.com";

  const createUser = () =>
    repo.create({
      username,
      email,
    });

  describe("create", () => {
    it("should create basic user", async () => {
      const user = await createUser();
      expect(user.username).toEqual(username);
      expect(user.email).toEqual(email);
    });

    it("should reject non-unique display_name", async () => {
      await createUser();

      const err = await expectError(() =>
        repo.create({
          username: username,
          email: "test2@test.com",
        })
      );
      expectPostgresError(err, PostgresErrorCode.UNIQUE_VIOLATION);
    });

    it("should reject non-unique email", async () => {
      await createUser();

      const err = await expectError(() =>
        repo.create({ username: "testuser2", email })
      );
      expectPostgresError(err, PostgresErrorCode.UNIQUE_VIOLATION);
    });
  });

  describe("delete", () => {
    it("should be able to delete user", async () => {
      const user = await createUser();

      await repo.delete({ id: user.id });

      const deletedUser = await repo.findOne({
        where: {
          id: user.id,
        },
      });
      expect(deletedUser).toEqual(undefined);
    });
  });

  describe("findOne", () => {
    it("should be able to find user", async () => {
      const user = await createUser();
      const foundUser = await repo.findOne({ where: { id: user.id } });
      expect(foundUser).toMatchObject(user);
    });
  });

  describe("find", () => {
    it("should be able to find list of users", async () => {
      const user = await createUser();
      const users = await repo.find({ where: { id: user.id } });
      expect(users.length).toEqual(1);

      const [foundUser] = users;
      expect(foundUser).toMatchObject(user);
    });
  });
});
