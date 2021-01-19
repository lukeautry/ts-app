import { Client } from "pg";
import { environment } from "../environment";
import { log } from "../utils/log";
import { sleep } from "../../common/utils/sleep";
import { runMigration } from "./run-migration";

const getClient = async () => {
  const maxRetries = 10;
  const interval = 2500;
  let tries = 1;

  while (tries <= maxRetries) {
    try {
      const client = new Client({
        port: 54322,
        host: "localhost",
        user: "postgres",
        password: "admin",
        database: "postgres",
      });
      await client.connect();
      return client;
    } catch (err) {
      log.error(
        `[try ${tries}/${maxRetries}] PostgreSQL Not Ready${
          err ? `: ${err.message}` : ""
        }`
      );
      tries++;
      await sleep(interval);
    }
  }

  throw new Error("Unable to establish connection to PostgreSQL");
};

/**
 * Create DB if necessary and run any pending updates
 */
export const setupDatabase = async (doMigration = true) => {
  const { DB_CONNECTION } = environment();

  const client = await getClient();

  const getDatabaseInfo = async () => {
    try {
      return await client.query(
        `SELECT datname FROM pg_catalog.pg_database WHERE datname='${DB_CONNECTION}'`
      );
    } catch (err) {
      log.error(
        `Couldn't query for database '${DB_CONNECTION}'${
          err ? `: ${err.message}` : ""
        }`
      );
      throw err;
    }
  };

  const { rowCount } = await getDatabaseInfo();
  if (rowCount === 0) {
    try {
      await client.query(`CREATE DATABASE ${DB_CONNECTION}`);
      log.success(`Database '${DB_CONNECTION}' created`);
    } catch (err) {
      log.error(
        `Couldn't create database '${DB_CONNECTION}'${
          err ? `: ${err.message}` : ""
        }`
      );
      throw err;
    }
  } else {
    log.success(`Database '${DB_CONNECTION}' already exists`);
  }

  if (doMigration) {
    await runMigration(DB_CONNECTION);
  }
};
