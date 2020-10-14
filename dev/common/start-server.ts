import http from "http";
import chalk from "chalk";
import minimatch from "minimatch";
import { getConnection } from "typeorm";
import { log } from "../utils/log";
import { environment } from "../../node/environment";

let server: http.Server | undefined;

/**
 * Starts server
 */
export const startServer = async () => {
  if (server) {
    log(chalk.red("Stopping server..."));
    server.close();
    log(chalk.redBright("Server stopped"));
  }

  server = undefined;
  Object.keys(require.cache).forEach((key) => {
    if (minimatch(key, "*.ts", { matchBase: true })) {
      delete require.cache[key];
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  server = await require("../../server/index").server();

  try {
    const connection = getConnection(environment.DB_CONNECTION);
    if (connection) {
      log(chalk.red("Restarting db connection"));
      await connection.close();
      await connection.connect();
    }
  } catch {}
};
