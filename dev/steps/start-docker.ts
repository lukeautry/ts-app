import chalk from "chalk";
import dockerCompose = require("docker-compose");
import { log } from "../utils/log";

/**
 * Shell out to docker-compose for non-Node.js based services
 */
export const startDocker = async () => {
  log(chalk.green("Starting docker-compose..."));
  const upResult = await dockerCompose.upAll({ cwd: "./dev/docker" });
  log(chalk.grey((upResult.out || upResult.err || "").trim()));
};
