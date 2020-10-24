import { DbConnectionName } from "../../node/database/db-connection-name";
import { getDbConnection } from "../../node/database/get-db-connection";

export const runMigration = async (name: DbConnectionName) => {
  const connection = await getDbConnection(name);

  await connection.runMigrations({});
};
