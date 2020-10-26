import { CommandModule } from "yargs";
import { commandDirOptions } from "../common/command-dir-options";

const docker: CommandModule = {
  command: "docker",
  describe: "Manage Docker Services",
  builder: (yargs) =>
    yargs.commandDir("./docker", commandDirOptions).demandCommand(),
  handler: () => undefined,
};

export default docker;
