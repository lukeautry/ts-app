import http from "http";
import minimatch from "minimatch";
import { getConnection } from "typeorm";
import { environment } from "../../node/environment";
import { log } from "../../node/utils/log";

let server: http.Server | undefined;

/**
 * Starts server
 */
export const startServer = async () => {
  if (server) {
    log.pending("Stopping server...");
    server.close();
  }

  server = undefined;
  Object.keys(require.cache).forEach((key) => {
    if (minimatch(key, "*.ts", { matchBase: true })) {
      delete require.cache[key];
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  server = await require("../../server/index").server();

  const { DB_CONNECTION } = environment();

  try {
    const connection = getConnection(DB_CONNECTION);
    if (connection) {
      await connection.close();
      await connection.connect();
    }
  } catch {}
};
