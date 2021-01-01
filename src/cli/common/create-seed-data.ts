import { clearDb } from "../../node/test/clear-db";

/**
 * Create seed data for tests
 */
export const createSeedData = async () => {
  await clearDb();
};
