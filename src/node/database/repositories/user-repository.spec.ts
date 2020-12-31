import { describeIntegration } from "../../test/describe-integration";
import { expectError } from "../../test/expect-error";
import { expectPostgresError } from "../../test/expect-postgres-error";
import { PostgresErrorCode } from "../postgres/postgres-error-codes";
import { UserRepository } from "./user-repository";

describeIntegration("UserRepository", () => {
  const repo = new UserRepository();
  const email = "test@test.com";
  const name = "Test User";

  const createUser = () =>
    repo.create({
      email,
      name,
    });

  describe("create", () => {
    it("should create basic user", async () => {
      const user = await createUser();
      expect(user.email).toEqual(email);
      expect(user.name).toEqual(name);
    });

    it("should reject non-unique email", async () => {
      await createUser();

      const err = await expectError(() => repo.create({ email, name }));
      expectPostgresError(err, PostgresErrorCode.UNIQUE_VIOLATION);
    });
  });

  describe("update", () => {
    it("should update name", async () => {
      const user = await createUser();
      const newName = "New Test User";

      const updatedUser = await repo.update({
        ...user,
        name: newName,
      });
      expect(updatedUser.name).toEqual(newName);
      expect(+updatedUser.date_updated).toBeGreaterThan(+user.date_updated);
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
