import chalk from "chalk";
import { log } from "../utils/log";

/**
 * Handles "Ctrl+C" or "Q" to close process
 */
export const registerQuitKey = () => {
  log(chalk.whiteBright("** Press Q to quit **"));

// tslint:disable-next-line:no-var-requires
  require("keypress")(process.stdin);
  process.stdin.on("keypress", (_ch, key) => {
  if (
    key &&
    (key.name.toLowerCase() === "q" || (key.ctrl && key.name === "c"))
  ) {
    log(chalk.redBright("Quitting..."));
    process.kill(0);
  }
});

  if (process.stdin.setRawMode) {
  process.stdin.setRawMode(true);
}
  process.stdin.resume();
};
