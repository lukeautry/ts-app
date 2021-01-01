import { clearDb } from "../../node/test/clear-db";
import { getEmailService } from "../../server/services/email-service";
import { UserService } from "../../server/services/user-service";

/**
 * Create seed data for tests
 */
export const createSeedData = async () => {
  await clearDb();

  await new UserService(getEmailService()).register({
    email: "test@test.com",
    password: "test1234",
    name: "Test User",
  });
};
