import chalk from "chalk";
import * as dockerCompose from "docker-compose";
import { log } from "../utils/log";

/**
 * Shell out to docker-compose for non-Node.js based services
 */
export const stopDocker = async () => {
  log(chalk.green("Stopping docker-compose services..."));
  const upResult = await dockerCompose.down({ cwd: "./dev/docker" });
  log(chalk.grey((upResult.out || upResult.err || "").trim()));
};
