import http from "http";
import chalk from "chalk";
import minimatch from "minimatch";
import { log } from "../utils/log";

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
};
