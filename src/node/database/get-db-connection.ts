import { Connection, createConnection, getConnection } from "typeorm";
import { DbConnectionName } from "./db-connection-name";

export const getDbConnection = async (
  name: DbConnectionName
): Promise<Connection> => {
  try {
    return getConnection(name);
  } catch {
    return await createConnection(name);
  }
};

// export const closeDbConnection = async (name: DbConnectionName) => {
//   const connection = getConnection;
//   if (connection) {
//     delete connectionMap[name];
//     await connection.close();
//   }
// };
