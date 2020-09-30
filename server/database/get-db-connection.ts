import { Connection, createConnection, getConnection } from "typeorm";

const connectionMap: Record<string, Connection | undefined> = {};

export type DbConnectionName = "defaultdb" | "test";

export const getDbConnection = async (
  name: DbConnectionName
): Promise<Connection> => {
  let connection = connectionMap[name];
  if (connection) {
    return connection;
  }

  try {
    connection = getConnection(name);
  } catch {
    connection = await createConnection(name);
  }

  return (connectionMap[name] = connection);
};
