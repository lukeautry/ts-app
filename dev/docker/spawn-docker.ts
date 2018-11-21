import { spawnCmd } from "../spawn-command";

export const spawnDocker = () => {
  spawnCmd("docker-compose", [
    "--file", "./dev/docker/docker-compose.yaml", "up",
  ]);
};
