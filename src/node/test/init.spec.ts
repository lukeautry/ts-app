import { environment } from "../environment";
import { getDbConnection } from "../database/get-db-connection";
import { startDocker } from "../dev/start-docker";
import { generateExpressRoutes } from "../dev/generate-express-routes";
import { setupDatabase } from "../dev/setup-database";

before(async () => {
  await startDocker();
  await setupDatabase(false);
  await generateExpressRoutes();
});

beforeEach(async () => {
  await clearDb();
});

after(async () => {
  await clearDb();
  setTimeout(() => process.exit(0), 0);
});

const clearDb = async () => {
  const { DB_CONNECTION } = environment();
  const connection = await getDbConnection(DB_CONNECTION);
  await connection.synchronize(true);
};
