import { Client } from "pg";
import { environment } from "../environment";
import { log } from "../utils/log";
import { runMigration } from "./run-migration";

/**
 * Create DB if necessary and run any pending updates
 */
export const setupDatabase = async (doMigration = true) => {
  const { DB_CONNECTION } = environment();

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
    log.error(`PostgreSQL Not Ready${err ? `: ${err.message}` : ""}`);
  }

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
