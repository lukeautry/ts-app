import { getRedisClient } from "../../node/redis";
import { log } from "../../node/utils/log";

/**
 * Verifies that Redis is available
 */
export const checkRedis = async () => {
  log.pending("Checking Redis Connection...");

  const redis = getRedisClient();
  return new Promise((resolve, reject) => {
    redis.on("connect", () => {
      log.success("Redis Ready");
      resolve();
    });
    redis.on("error", () => {
      log.error("Redis Not Ready");
      reject();
    });
  });
};
