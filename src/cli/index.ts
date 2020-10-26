import yargs from "yargs";
import { commandDirOptions } from "./common/command-dir-options";

yargs
  .scriptName("yarn cli")
  .commandDir("./commands", commandDirOptions)
  .demandCommand()
  .help().argv;
