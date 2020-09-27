import chalk from "chalk";
import readlineSync from "readline-sync";
import { execCmd } from "../utils/exec-cmd";

(async () => {
  const migrationName = readlineSync.question(
    chalk.blue("Enter a migration name:\n")
  );
  await execCmd(`yarn typeorm migration:generate --name ${migrationName}`);
})();
