import { spawnDocker } from "./docker/spawn-docker";
import { spawnCmd } from "./spawn-command";

const cleanExit = () => process.exit();
process.on("SIGINT", cleanExit); // catch ctrl-c
process.on("SIGTERM", cleanExit); // catch kill

(async () => {
  spawnDocker();
})();
