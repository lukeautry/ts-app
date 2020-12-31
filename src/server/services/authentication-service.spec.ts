import {
  testUserEmail,
  testUserName,
  testUserPassword,
} from "../../node/test/create-test-user";
import { describeIntegration } from "../../node/test/describe-integration";
import { expectError } from "../../node/test/expect-error";
import { HttpStatusCode } from "../common/http-status-code";
import { expectOperationError } from "../test/expect-operation-error";
import { AuthenticationService } from "./authentication-service";
import { IEmailService } from "./email-service";
import { UserService } from "./user-service";

describeIntegration("AuthenticationService", () => {
  const service = new AuthenticationService();
  const registerUser = () => {
    const emailService: IEmailService = {
      send: async () => undefined,
    };

    return new UserService(emailService).register({
      email: testUserEmail,
      name: testUserName,
      password: testUserPassword,
    });
  };

  describe("login", () => {
    it("should be able to get access token with valid username/password", async () => {
      await registerUser();

      const loginResult = await service.login({
        email: testUserEmail,
        password: testUserPassword,
      });

      expect(loginResult.user.email).toEqual(testUserEmail);
      expect(loginResult.value.length).toBeGreaterThan(0);
    });

    it("should reject with wrong password", async () => {
      await registerUser();

      const err = await expectError(() =>
        service.login({
          email: testUserEmail,
          password: "badpassword123",
        })
      );
      expectOperationError(
        err,
        "INVALID_EMAIL_OR_PASSWORD",
        HttpStatusCode.UNAUTHORIZED
      );
    });
  });

  describe("getIdentity", () => {
    it("should return user from token", async () => {
      await registerUser();

      const loginResult = await service.login({
        email: testUserEmail,
        password: testUserPassword,
      });

      const user = await service.getIdentity(loginResult.value);
      if (!user) {
        throw new Error("expected user to exist");
      }
      expect(user.email).toEqual(testUserEmail);
    });
  });
});
