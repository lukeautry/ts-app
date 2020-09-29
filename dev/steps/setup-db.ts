import chalk from "chalk";
import { Client } from "pg";
import { DbConnectionName } from "../../server/config/get-db-connection";
import { execCmd } from "../utils/exec-cmd";
import { log } from "../utils/log";

/**
 * Create DB if necessary and run any pending updates
 */
export const setupDatabase = async (databaseName: DbConnectionName) => {
  const client = new Client({
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: "admin",
    database: "postgres",
  });

  try {
    await client.connect();
  } catch (err) {
    log(chalk.red(`☓ PostgreSQL Not Ready${err ? `: ${err.message}` : ""}`));
  }

  const getDatabaseInfo = async () => {
    try {
      return await client.query(
        `SELECT datname FROM pg_catalog.pg_database WHERE datname='${databaseName}'`
      );
    } catch (err) {
      log(
        chalk.red(
          `☓ Couldn't query for database '${databaseName}'${
            err ? `: ${err.message}` : ""
          }`
        )
      );
      throw err;
    }
  };

  const { rowCount } = await getDatabaseInfo();
  if (rowCount === 0) {
    try {
      await client.query(`CREATE DATABASE ${databaseName}`);
      log(chalk.greenBright(`✓ Database '${databaseName}' created`));
    } catch (err) {
      log(
        chalk.red(
          `☓ Couldn't create database '${databaseName}'${
            err ? `: ${err.message}` : ""
          }`
        )
      );
      throw err;
    }
  } else {
    log(chalk.greenBright(`✓ Database '${databaseName}' already exists`));
  }

  await execCmd(`yarn typeorm migration:run --connection ${databaseName}`);
};
