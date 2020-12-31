import { UserPasswordRepository } from "../../node/database/repositories/user-password-repository";
import { createTestUser } from "../../node/test/create-test-user";
import { describeIntegration } from "../../node/test/describe-integration";
import { UserPasswordService } from "./user-password-service";

describeIntegration("UserPasswordService", () => {
  const password = "test1234";
  const service = new UserPasswordService();

  it("should be able to set password for existing user", async () => {
    const user = await createTestUser();

    await service.setPassword({ userId: user.id, password });

    const userPassword = await new UserPasswordRepository().findOne({
      where: { user_id: user.id },
    });
    if (!userPassword) {
      throw new Error("couldn't find userPassword");
    }

    expect(userPassword.user_id).toEqual(user.id);
    expect(userPassword.hash.length).toBeGreaterThan(0);

    const isValid = await service.isValidPassword(user.id, password);
    expect(isValid).toEqual(true);
  });
});
