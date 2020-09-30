import { setupDatabase } from "../../dev/steps/setup-db";
import { startDocker } from "../../dev/steps/start-docker";
import { getEnv } from "../config/get-env";
import { getDbConnection } from "../database/get-db-connection";

before(async () => {
  await startDocker();
  await setupDatabase(false);
});

beforeEach(async () => {
  await clearDb();
});

after(async () => {
  await clearDb();
  setTimeout(() => process.exit(0), 0);
});

const clearDb = async () => {
  const { DB_CONNECTION } = getEnv();
  const connection = await getDbConnection(DB_CONNECTION);
  await connection.synchronize(true);
};
