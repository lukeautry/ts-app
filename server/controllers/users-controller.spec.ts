import { expect } from "chai";
import { IUser } from "../database/entities/user";
import { UserRepository } from "../database/repositories/user-repository";
import { getTestServer } from "../test/get-test-server";
import { HttpStatusCode } from "../utils/http-status-code";

const USER_COUNT = 10;

const createTestUsers = async () => {
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

describe("UsersController", () => {
  const server = getTestServer();

  beforeEach(() => createTestUsers());

  describe("GetUserById", () => {
    it("should be able to get user by ID", async () => {
      await server
        .get(`/api/users/1`)
        .expect(HttpStatusCode.OK)
        .expect(({ body: user }) => {
          expect(user.email).to.equal("test_0@test.com");
        });
    });

    it("should throw error if user does not exist", async () => {
      await server.get(`/api/users/999`).expect(HttpStatusCode.NOT_FOUND);
    });
  });

  describe("GetUsers", () => {
    it("should get users", async () => {
      await server
        .get(`/api/users`)
        .expect(HttpStatusCode.OK)
        .expect(({ body: users }) => {
          expect(users.length).to.equal(USER_COUNT);
        });
    });

    it("should limit page size", async () => {
      const size = 5;
      await server
        .get(`/api/users?page_size=${size}`)
        .expect(({ body: users }) => {
          expect(users.length).to.equal(size);
        });
    });

    it("should return 2nd page", async () => {
      const size = 5;
      await server
        .get(`/api/users?page_size=${size}&page_number=${2}`)
        .expect(HttpStatusCode.OK)
        .expect(({ body: users }) => {
          expect(users.length).to.equal(size);
          expect(users[0].id).to.equal(6);
        });
    });

    const invalidPageValues = [0, -1, 1.1];
    for (const value of invalidPageValues) {
      it(`should reject invalid page_number value ${value}`, async () => {
        await server
          .get(`/api/users?page_number=${value}`)
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    }

    const invalidPageSizeValues = [0, -1, 1.1];
    for (const value of invalidPageSizeValues) {
      it(`should reject invalid page_size value ${value}`, async () => {
        await server
          .get(`/api/users?page_size=${value}`)
          .expect(HttpStatusCode.BAD_REQUEST);
      });
    }
  });
});
