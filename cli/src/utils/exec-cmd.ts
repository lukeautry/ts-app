import { exec } from "child_process";
import { log } from "util";

export const execCmd = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }

      if (stdout) {
        log(stdout.trim());
      }

      if (stderr) {
        log(stderr.trim());
      }

      resolve();
    });
  });
};
