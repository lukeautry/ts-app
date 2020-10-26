import { CommandModule } from "yargs";
import { commandDirOptions } from "../common/command-dir-options";

const migrate: CommandModule = {
  command: "migrate",
  describe: "Manage TypeORM Migrations",
  builder: (yargs) =>
    yargs.commandDir("./migrate", commandDirOptions).demandCommand(),
  handler: () => undefined,
};

export default migrate;
