import chalk from "chalk";
import * as dockerCompose from "docker-compose";
import { log } from "../utils/log";

/**
 * Shell out to docker-compose for non-Node.js based services
 */
export const startDocker = async () => {
  log(chalk.green("Starting docker-compose services..."));
  const upResult = await dockerCompose.upAll({ cwd: "./dev/docker" });
  log(chalk.grey((upResult.out || upResult.err || "").trim()));
};
