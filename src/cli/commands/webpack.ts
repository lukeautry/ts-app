import { CommandModule } from "yargs";
import { commandDirOptions } from "../common/command-dir-options";

const webpack: CommandModule = {
  command: "webpack",
  describe: "Webpack utilities",
  builder: (yargs) =>
    yargs.commandDir("./webpack", commandDirOptions).demandCommand(),
  handler: () => undefined,
};

export default webpack;
