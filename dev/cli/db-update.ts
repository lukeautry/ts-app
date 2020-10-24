import { runMigration } from "../common/run-migration";
import { getDatabaseName } from "./get-database-name";

(async () => {
  const databaseName = getDatabaseName();
  await runMigration(databaseName);
})();
