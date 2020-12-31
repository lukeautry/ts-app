import { HttpStatusCode } from "../common/http-status-code";
import {
  testUserEmail,
  testUserName,
  createTestUser,
  testUserPassword,
} from "../../node/test/create-test-user";
import { expectError } from "../../node/test/expect-error";
import { expectOperationError } from "../test/expect-operation-error";
import { UserRepository } from "../../node/database/repositories/user-repository";
import { describeIntegration } from "../../node/test/describe-integration";
import { UserService } from "./user-service";
import { UserPasswordService } from "./user-password-service";
import { AuthenticationService } from "./authentication-service";
import { IEmailService, ISendOptions } from "./email-service";
import { VerificationTokenService } from "./verification-token-service";

class TestEmailService implements IEmailService {
  parameters = new Array<ISendOptions>();

  async send(options: ISendOptions) {
    this.parameters.push(options);
  }
}

describeIntegration("UserService", () => {
  let service: UserService;
  let emailService: TestEmailService;

  beforeEach(() => {
    emailService = new TestEmailService();
    service = new UserService(emailService);
  });

  describe("getById", () => {
    it("should be able to get by id", async () => {
      const user = await createTestUser();

      const foundUser = await service.getById(user.id);
      expect(foundUser.email).toEqual(user.email);
    });

    it("should reject if user not found", async () => {
      const error = await expectError(() => service.getById(0));
      expectOperationError(error, "NOT_FOUND", HttpStatusCode.NOT_FOUND);
    });
  });

  describe("create", () => {
    it("should be able to create user", async () => {
      const user = await service.create({
        email: testUserEmail,
        name: testUserName,
      });

      expect(user.email).toEqual(testUserEmail);
    });

    it("should reject invalid email", async () => {
      const error = await expectError(() =>
        service.create({ email: "test1234", name: testUserName })
      );
      expectOperationError(error, "INVALID_EMAIL", HttpStatusCode.BAD_REQUEST);
    });

    it("should reject in use email", async () => {
      const user = await createTestUser();

      const error = await expectError(() =>
        service.create({ email: user.email, name: testUserName })
      );
      expectOperationError(error, "EMAIL_IN_USE", HttpStatusCode.BAD_REQUEST);
    });
  });

  describe("register", () => {
    it("should reject invalid email", async () => {
      const error = await expectError(() =>
        service.register({
          email: "blah",
          password: testUserPassword,
          name: testUserName,
        })
      );
      expectOperationError(error, "INVALID_EMAIL", HttpStatusCode.BAD_REQUEST);
    });

    it("should reject invalid password", async () => {
      const error = await expectError(() =>
        service.register({
          email: testUserEmail,
          name: testUserName,
          password: "hunter",
        })
      );
      expectOperationError(
        error,
        "INVALID_PASSWORD",
        HttpStatusCode.BAD_REQUEST
      );
    });

    it("should reject if email in use", async () => {
      await createTestUser();

      const error = await expectError(() =>
        service.register({
          email: testUserEmail,
          name: testUserName,
          password: "test1234",
        })
      );
      expectOperationError(error, "EMAIL_IN_USE", HttpStatusCode.BAD_REQUEST);
    });

    it("should have succeeded and have set password", async () => {
      const password = "test1234";
      await service.register({
        email: testUserEmail,
        name: testUserName,
        password,
      });

      const user = await new UserRepository().findOne({
        where: { email: testUserEmail },
      });
      if (!user) {
        throw new Error("expected user to be created");
      }

      if (
        !(await new UserPasswordService().isValidPassword(user.id, password))
      ) {
        throw new Error("expected password to be valid");
      }
    });
  });

  describe("update", () => {
    it("should reject without name", async () => {
      const user = await createTestUser();

      const err = await expectError(() =>
        service.update(user, {
          name: "",
          email: testUserEmail,
        })
      );
      expectOperationError(
        err,
        "INVALID_PARAMETERS",
        HttpStatusCode.BAD_REQUEST
      );
    });

    it("should be able to update", async () => {
      const user = await createTestUser();
      const name = "Name_Chaned";
      const email = "test2@test.com";

      const updatedUser = await service.update(user, {
        name,
        email,
      });
      expect(updatedUser.name).toEqual(name);
      expect(updatedUser.email).toEqual(email);
    });

    it("should reject invalid email", async () => {
      const user = await createTestUser();
      const err = await expectError(() =>
        service.update(user, {
          name: user.name,
          email: "invalidemail",
        })
      );
      expectOperationError(err, "INVALID_EMAIL", HttpStatusCode.BAD_REQUEST);
    });

    it("should reject in use email", async () => {
      const [otherUser, user] = await Promise.all([
        createTestUser({
          email: "test2@test.com",
        }),
        createTestUser(),
      ]);

      const err = await expectError(() =>
        service.update(user, {
          name: user.name,
          email: otherUser.email,
        })
      );
      expectOperationError(err, "EMAIL_IN_USE", HttpStatusCode.BAD_REQUEST);
    });
  });

  describe("changePassword", () => {
    it("should reject if empty oldPassword", async () => {
      const user = await createTestUser();

      const err = await expectError(() =>
        service.changePassword(user, {
          oldPassword: "",
          newPassword: "abcd1234",
        })
      );
      expectOperationError(
        err,
        "INVALID_PARAMETERS",
        HttpStatusCode.BAD_REQUEST
      );
    });

    it("should reject if empty newPassword", async () => {
      const user = await createTestUser();

      const err = await expectError(() =>
        service.changePassword(user, {
          oldPassword: "abcd1234",
          newPassword: "",
        })
      );
      expectOperationError(
        err,
        "INVALID_PARAMETERS",
        HttpStatusCode.BAD_REQUEST
      );
    });

    it("should reject if oldPassword is invalid", async () => {
      const { user } = await service.register({
        email: testUserEmail,
        name: testUserName,
        password: testUserPassword,
      });

      const err = await expectError(() =>
        service.changePassword(user, {
          oldPassword: "wrong_password_123",
          newPassword: "abcd1234",
        })
      );
      expectOperationError(err, "INVALID_PASSWORD", HttpStatusCode.BAD_REQUEST);
    });

    it("should reject if newPassword doesn't meet requirements", async () => {
      const { user } = await service.register({
        email: testUserEmail,
        name: testUserName,
        password: testUserPassword,
      });

      const err = await expectError(() =>
        service.changePassword(user, {
          oldPassword: "test1234",
          newPassword: "short",
        })
      );
      expectOperationError(err, "INVALID_PASSWORD", HttpStatusCode.BAD_REQUEST);
    });

    it("should be able to change password successfully", async () => {
      const { user } = await service.register({
        email: testUserEmail,
        name: testUserName,
        password: testUserPassword,
      });

      const newPassword = "newPassword123";
      await service.changePassword(user, {
        oldPassword: testUserPassword,
        newPassword,
      });

      // should be able to login
      await new AuthenticationService().login({
        email: testUserEmail,
        password: newPassword,
      });
    });
  });

  describe("resetPassword", () => {
    it("should reject unknown email address", async () => {
      const err = await expectError(() =>
        service.resetPassword("fake@email.com")
      );
      expectOperationError(err, "INVALID_EMAIL", HttpStatusCode.NOT_FOUND);
    });

    it("should send reset email", async () => {
      const { user } = await service.register({
        email: testUserEmail,
        name: testUserName,
        password: testUserPassword,
      });

      await service.resetPassword(user.email);

      expect(emailService.parameters.length).toEqual(1);
    });
  });

  describe("confirmResetPassword", () => {
    it("should reject invalid token", async () => {
      const err = await expectError(() =>
        service.consumeResetPassword({
          token: "FakeToken",
          password: "test1234",
        })
      );
      expectOperationError(err, "INVALID_TOKEN", HttpStatusCode.BAD_REQUEST);
    });

    it("should reject invalid password", async () => {
      const user = await createTestUser();
      const token = await new VerificationTokenService().create({
        userId: user.id,
        type: "reset_password",
      });

      const err = await expectError(() =>
        service.consumeResetPassword({
          token: token.value,
          password: "abc",
        })
      );
      expectOperationError(err, "INVALID_PASSWORD", HttpStatusCode.BAD_REQUEST);
    });

    it("should set password and return valid access token", async () => {
      const user = await createTestUser();
      const token = await new VerificationTokenService().create({
        userId: user.id,
        type: "reset_password",
      });

      const result = await service.consumeResetPassword({
        token: token.value,
        password: "new_password_123",
      });

      const userFromToken = await new AuthenticationService().getIdentity(
        result.value
      );
      if (!userFromToken) {
        throw new Error("expected to find user from access token");
      }

      expect(userFromToken.id).toEqual(user.id);

      await new AuthenticationService().login({
        password: "new_password_123",
        email: user.email,
      });
    });
  });
});
