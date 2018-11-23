import chalk from "chalk";
import { initializeDbConnection } from "../../api/config/postgres";
import { log } from "../utils/log";

/**
 * Verifies that PostgreSQL is available
 */
export const checkDb = async () => {
  log(chalk.green("Checking PostgreSQL..."));

  try {
    await initializeDbConnection();
    log(chalk.greenBright(`✓ PostgreSQL Ready`));
  } catch (err) {
    log(chalk.redBright(`☓ PostgreSQL Not Ready`));
    throw err;
  }
};
