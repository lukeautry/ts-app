import chalk from "chalk";
import { initializeDbConnection } from "../../server/config/postgres";
import { log } from "../utils/log";
import { sleep } from "../utils/sleep";

/**
 * Verifies that PostgreSQL is available
 */
export const checkDb = async () => {
  log(chalk.green("Checking PostgreSQL..."));

  let retry = 0;
  const maxRetries = 3;

  while (retry < maxRetries) {
    try {
      await initializeDbConnection();
      log(chalk.greenBright(`✓ PostgreSQL Ready`));
      return;
    } catch {
      // ignore
      retry++;
      await sleep(2000);
    }
  }

  log(chalk.redBright(`☓ PostgreSQL Not Ready`));
};
