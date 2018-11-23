import chalk from "chalk";
import { getRedisClient } from "../../api/config/redis";
import { log } from "../utils/log";

/**
 * Verifies that Redis is available
 */
export const checkRedis = async () => {
  log(chalk.green("Checking Redis Connection..."));

  const redis = getRedisClient();
  return new Promise((resolve, reject) => {
    redis.on("connect", () => {
      log(chalk.greenBright(`✓ Redis Ready`));
      resolve();
    });
    redis.on("error", () => {
      log(chalk.redBright(`☓ Redis Not Ready`));
      reject();
    });
  });
};
