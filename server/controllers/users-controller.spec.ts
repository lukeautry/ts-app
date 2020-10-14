import { expect } from "chai";
import { IUser } from "../../node/database/entities/user";
import { UserRepository } from "../../node/database/repositories/user-repository";
import { getTestServer } from "../test/get-test-server";
import { HttpStatusCode } from "../common/http-status-code";

describe("UsersController", () => {
  const server = getTestServer();

  const createTestUsers = async (count: number) => {
    const userRepository = new UserRepository();

    const promises = new Array<Promise<IUser>>();
    for (let i = 0; i < count; i++) {
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

  describe("Get", () => {
    const USER_COUNT = 10;

    beforeEach(() => createTestUsers(USER_COUNT));

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

  describe("CreateUser", () => {
    it("should be able to create new user", async () => {
      const email = "test@test.com";
      const name = "Test User";

      await server
        .post("/api/users")
        .send({ email, name })
        .expect(HttpStatusCode.OK)
        .expect(({ body: user }) => {
          expect(user.email).to.equal(email);
          expect(user.name).to.equal(name);
        });
    });
  });

  describe("DeleteUser", () => {
    beforeEach(() => createTestUsers(1));

    it("should be able to delete user", async () => {
      await server.delete(`/api/users/1`).expect(HttpStatusCode.NO_CONTENT);
    });

    it("should reject float user_id", async () => {
      await server.delete(`/api/users/1.1`).expect(HttpStatusCode.BAD_REQUEST);
    });

    it("should reject string user_id", async () => {
      await server.delete(`/api/users/one`).expect(HttpStatusCode.BAD_REQUEST);
    });
  });

  describe("UpdateUser", () => {
    beforeEach(() => createTestUsers(2));

    it("should be able to update", async () => {
      const email = "new_test@test.com";

      await server
        .patch("/api/users/1")
        .send({ email, name: `Test User #0` })
        .expect(HttpStatusCode.OK)
        .expect(({ body: user }) => {
          expect(user.email).to.equal(email);
        });
    });

    it("should reject email in use", async () => {
      const email = "test_1@test.com";

      await server
        .patch("/api/users/1")
        .send({ email })
        .expect(HttpStatusCode.BAD_REQUEST);
    });
  });
});
