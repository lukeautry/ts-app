import { Connection, createConnection } from "typeorm";

const connectionMap: Record<string, Connection | undefined> = {};

export type DbConnectionName = "defaultdb" | "test";

export const getDbConnection = async (name: DbConnectionName) => {
  return (connectionMap[name] =
    connectionMap[name] || (await createConnection(name)));
};
