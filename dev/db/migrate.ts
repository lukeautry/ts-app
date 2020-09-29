import chalk from "chalk";
import readlineSync from "readline-sync";
import { execCmd } from "../utils/exec-cmd";
import { getDatabaseName } from "./get-database-name";

(async () => {
  const migrationName = readlineSync.question(
    chalk.blue("Enter a migration name:\n")
  );
  const databaseName = getDatabaseName();

  await execCmd(
    `yarn typeorm migration:generate --name ${migrationName} --connection ${databaseName}`
  );
})();
