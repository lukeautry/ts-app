import { CommandModule } from "yargs";
import { commandDirOptions } from "../common/command-dir-options";

const test: CommandModule = {
  command: "test",
  describe: "Test commands",
  builder: (yargs) =>
    yargs.commandDir("./test", commandDirOptions).demandCommand(),
  handler: () => undefined,
};

export default test;
