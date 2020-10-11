import { generateExpressRoutes } from "../../dev/common/generate-express-routes";
import { setupDatabase } from "../../dev/common/setup-database";
import { startDocker } from "../../dev/common/start-docker";
import { environment } from "../config/environment";
import { getDbConnection } from "../database/get-db-connection";

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
