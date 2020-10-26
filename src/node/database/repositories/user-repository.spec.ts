import { expect } from "chai";
import { expectError } from "../../test/expect-error";
import { expectPostgresError } from "../../test/expect-postgres-error";
import { PostgresErrorCode } from "../postgres/postgres-error-codes";
import { UserRepository } from "./user-repository";

describe("UserRepository", () => {
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
      expect(user.email).to.equal(email);
      expect(user.name).to.equal(name);
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
      expect(updatedUser.name).to.equal(newName);
      expect(updatedUser.date_updated).to.be.greaterThan(user.date_updated);
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
      expect(deletedUser).to.equal(undefined);
    });
  });

  describe("findOne", () => {
    it("should be able to find user", async () => {
      const user = await createUser();
      const foundUser = await repo.findOne({ where: { id: user.id } });
      expect(foundUser).to.deep.equal(user);
    });
  });

  describe("find", () => {
    it("should be able to find list of users", async () => {
      const user = await createUser();
      const users = await repo.find({ where: { id: user.id } });
      expect(users.length).to.equal(1);

      const [foundUser] = users;
      expect(foundUser).to.deep.equal(user);
    });
  });
});
