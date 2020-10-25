import { CommandModule } from "yargs";
import { startDocker } from "../../../../node/src/dev/start-docker";

const start: CommandModule<{}> = {
  command: "start",
  describe: "Start docker services",
  handler: async () => {
    await startDocker();
  },
};

export default start;
