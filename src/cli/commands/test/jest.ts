import path from "path";
import { CommandModule } from "yargs";
import { runCLI } from "jest";
import { startDocker } from "../../../node/dev/start-docker";
import { setupDatabase } from "../../../node/dev/setup-database";

const jest: CommandModule<{}, { path?: string }> = {
  command: "jest [path]",
  describe: "Run Jest Tests",
  builder: (yargs) =>
    yargs.positional("path", {
      type: "string",
    }),
  handler: async ({ path: filePath }) => {
    process.env.DB_CONNECTION = "defaultdb_test";
    process.env.NODE_ENV = "test";
    process.env.SERVER_PORT = "3037";

    await startDocker();
    await setupDatabase(false);

    const base = path.join(__dirname, "../../../..");
    const testMatch = [path.join(base, filePath ?? "src/**/*.spec.{ts,tsx}")];

    runCLI(
      {
        _: [],
        $0: "",
        runInBand: true,
        testMatch,
        preset: "ts-jest",
        watch: false,
        globalTeardown: path.join(__dirname, "../../common/global-teardown.ts"),
      },
      [base]
    );
  },
};

export default jest;
