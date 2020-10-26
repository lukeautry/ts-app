import { RequireDirectoryOptions } from "yargs";

export const commandDirOptions: RequireDirectoryOptions = {
  extensions: ["ts", "js"],
  visit: (module) => module.default,
};
