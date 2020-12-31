import { getDbConnection } from "../database/get-db-connection";
import { environment } from "../environment";

const clearDb = async () => {
  const { DB_CONNECTION } = environment();
  const connection = await getDbConnection(DB_CONNECTION);
  await connection.synchronize(true);
};

/**
 * Works like a standard Jest describe block, but executes a database setup before each test.
 * Only use this for tests that hit the database.
 */
export const describeIntegration = (name: string, suiteFn: () => void) =>
  describe(name, () => {
    beforeEach(async () => {
      await clearDb();
    });

    suiteFn();
  });
