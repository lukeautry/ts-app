import { spawn } from "child_process";

const c = console;

export const spawnCmd = (command: string, args: string[]) => {
  const ls = spawn(command, args);

  ls.stdout.on("data", (data) => {
    c.log(`${data}`);
  });

  ls.stderr.on("data", (data) => {
    c.log(`${data}`);
  });

  ls.on("close", (code) => {
    c.log(`child process exited with code ${code}`);
  });

  process.on("exit", () =>  {
    ls.kill("SIGINT");
  });
};
