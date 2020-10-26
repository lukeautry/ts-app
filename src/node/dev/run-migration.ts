import { DbConnectionName } from "../database/db-connection-name";
import { getDbConnection } from "../database/get-db-connection";

export const runMigration = async (name: DbConnectionName) => {
  const connection = await getDbConnection(name);
  await connection.runMigrations({});
};
