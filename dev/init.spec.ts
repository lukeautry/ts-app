import { environment } from "../node/environment";
import { getDbConnection } from "../node/database/get-db-connection";
import { generateExpressRoutes } from "./common/generate-express-routes";
import { setupDatabase } from "./common/setup-database";
import { startDocker } from "./common/start-docker";

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
  const { DB_CONNECTION } = environment;
  const connection = await getDbConnection(DB_CONNECTION);
  await connection.synchronize(true);
};
