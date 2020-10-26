import * as dockerCompose from "docker-compose";
import { log } from "../utils/log";

/**
 * Shell out to docker-compose for non-Node.js based services
 */
export const startDocker = async () => {
  log.pending("Starting docker-compose services...");
  const upResult = await dockerCompose.upAll({ cwd: "./.docker" });
  log.custom((upResult.out || upResult.err || "").trim());
};
