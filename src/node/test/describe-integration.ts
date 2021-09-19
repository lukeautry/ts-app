import { clearDb } from "./clear-db";

/**
 * Works like a standard Jest describe block, but executes a database setup before each test.
 * Only use this for tests that hit the database.
 */
export const describeIntegration = (name: string, suiteFn: () => void) =>
  describe(name, () => {
    beforeEach(async () => {
      if (!global.setImmediate) {
        global.setImmediate = global.setTimeout as any;
      }

      await clearDb();
    });

    suiteFn();
  });
