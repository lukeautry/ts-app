import { Connection, createConnection } from "typeorm";

export let connection: Connection;

export const initializeDbConnection = async (name = "default") => {
  if (connection) {
    return connection;
  }

  connection = await createConnection(name);
};
