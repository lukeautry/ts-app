import * as dockerCompose from "docker-compose";
import { log } from "../utils/log";

/**
 * Stop docker-compose services
 */
export const stopDocker = async () => {
  log.pending("Stopping docker-compose services...");
  const upResult = await dockerCompose.down({ cwd: "./.docker" });
  log.custom((upResult.out || upResult.err || "").trim());
};
