import { log } from "../../node/utils/log";

/**
 * Handles "Ctrl+C" or "Q" to close process
 */
export const registerQuitKey = () => {
  log.error("** Press Q to quit **");

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("keypress")(process.stdin);
  process.stdin.on("keypress", (_ch, key) => {
    if (
      key &&
      (key.name.toLowerCase() === "q" || (key.ctrl && key.name === "c"))
    ) {
      log.pending("Quitting...");
      process.kill(0);
    }
  });

  if (process.stdin.setRawMode) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
};
