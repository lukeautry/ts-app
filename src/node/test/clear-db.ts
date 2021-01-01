import { getDbConnection } from "../database/get-db-connection";
import { environment } from "../environment";

export const clearDb = async () => {
  const { DB_CONNECTION, NODE_ENV } = environment();
  if (NODE_ENV !== "test") {
    throw new Error("clearDb only permitted in test env");
  }

  const connection = await getDbConnection(DB_CONNECTION);
  await connection.synchronize(true);
};
