import path from "path";
import { CommandModule } from "yargs";
import { runCLI } from "jest";
import { startDocker } from "../../node/dev/start-docker";
import { setupDatabase } from "../../node/dev/setup-database";

const start: CommandModule<{}> = {
  command: "test",
  describe: "Run Jest Tests",
  handler: async () => {
    process.env.DB_CONNECTION = "defaultdb_test";
    process.env.NODE_ENV = "test";
    process.env.SERVER_PORT = "3037";

    await startDocker();
    await setupDatabase(false);

    runCLI(
      {
        _: [],
        $0: "",
        runInBand: true,
        testMatch: [path.join(__dirname, "../../**/*.spec.{ts,tsx}")],
        preset: "ts-jest",
        watch: false,
        globalTeardown: path.join(__dirname, "../common/global-teardown.ts"),
      },
      [path.join(__dirname, "../../..")]
    );
  },
};

export default start;
