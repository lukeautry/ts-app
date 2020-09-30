import { expect } from "chai";
import { IUser } from "../database/entities/user";
import { UserRepository } from "../database/repositories/user-repository";
import { expectAPIError, expectError } from "../test/utils/expect-error";
import { HttpStatusCode } from "../utils/http-status-code";
import { UsersController } from "./users-controller";

const USER_COUNT = 10;

describe("UsersController", () => {
  const controller = new UsersController();

  const createUsers = async () => {
    const userRepository = new UserRepository();

    const promises = new Array<Promise<IUser>>();
    for (let i = 0; i < USER_COUNT; i++) {
      promises.push(
        userRepository.create({
          email: `test_${i}@test.com`,
          name: `Test User #${i}`,
          address: `${i} Washington Ave`,
        })
      );
    }

    await Promise.all(promises);
  };

  beforeEach(() => createUsers());

  describe("GetUserById", () => {
    it("should be able to get user by ID", async () => {
      const user = await controller.GetUserById(1);
      expect(user.email).to.equal("test_0@test.com");
    });

    it("should throw error if user does not exist", async () => {
      const err = await expectError(() => controller.GetUserById(999));
      expectAPIError(err);
      expect(err.status).to.equal(HttpStatusCode.NOT_FOUND);
    });
  });

  describe("GetUsers", () => {
    it("should get users", async () => {
      const users = await controller.GetUsers();
      expect(users.length).to.equal(USER_COUNT);
    });

    it("should limit page size", async () => {
      const size = 5;
      const users = await controller.GetUsers(undefined, size);
      expect(users.length).to.equal(size);
    });

    it("should return 2nd page", async () => {
      const size = 5;
      const users = await controller.GetUsers(2, size);
      expect(users.length).to.equal(size);
      expect(users[0].id).to.equal(6);
    });

    const invalidPageValues = [0, -1, 1.1];
    for (const value of invalidPageValues) {
      it(`should reject invalid page value ${value}`, async () => {
        const err = await expectError(() => controller.GetUsers(value));
        expectAPIError(err);
        expect(err.status).to.equal(HttpStatusCode.BAD_REQUEST);
      });
    }

    const invalidPageSizeValues = [0, -1, 1.1];
    for (const value of invalidPageSizeValues) {
      it(`should reject invalid page_size value ${value}`, async () => {
        const err = await expectError(() => controller.GetUsers(1, value));
        expectAPIError(err);
        expect(err.status).to.equal(HttpStatusCode.BAD_REQUEST);
      });
    }
  });
});
