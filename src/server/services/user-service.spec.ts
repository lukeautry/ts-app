import { expect } from "chai";
import { HttpStatusCode } from "../common/http-status-code";
import { expectOperationError } from "../test/expect-operation-error";
import { expectError } from "../../node/test/expect-error";
import { UserService } from "./user-service";

const email = "test@test.com";
const name = "Test User";
const address = "123 Washington Avenue";

describe("UserService", () => {
  const service = new UserService();

  const createUser = () =>
    service.createUser({
      email,
      name,
      address,
    });

  describe("createUser", () => {
    it("should be able to create user", async () => {
      const user = await createUser();
      expect(user.email).to.equal(email);
      expect(user.name).to.equal(name);
      expect(user.address).to.equal(address);
    });

    it("should reject invalid email", async () => {
      const err = await expectError(() =>
        service.createUser({
          email: "test123",
          name,
          address,
        })
      );
      expectOperationError(err, "INVALID_EMAIL", HttpStatusCode.BAD_REQUEST);
    });
  });

  describe("updateUser", () => {
    it("should be able to update user", async () => {
      const newEmail = "test_changed@test.com";
      const user = await createUser();

      const updatedUser = await service.updateUser(user.id, {
        email: newEmail,
        name: user.name,
        address: user.address,
      });

      expect(updatedUser.email).to.equal(newEmail);
    });

    it("should reject invalid email", async () => {
      const user = await createUser();

      const err = await expectError(() =>
        service.updateUser(user.id, {
          email: "one123",
          name,
          address,
        })
      );
      expectOperationError(err, "INVALID_EMAIL", HttpStatusCode.BAD_REQUEST);
    });
  });
});
