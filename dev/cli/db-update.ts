import { execCmd } from "../utils/exec-cmd";
import { getDatabaseName } from "./get-database-name";

(async () => {
  const databaseName = getDatabaseName();
  await execCmd(`yarn typeorm migration:run --connection ${databaseName}`);
})();
