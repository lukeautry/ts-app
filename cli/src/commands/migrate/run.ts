import { CommandModule } from "yargs";
import { runMigration } from "../../../../node/src/dev/run-migration";
import {
  DbConnectionName,
  dbConnectionNames,
} from "../../../../node/src/database/db-connection-name";

const run: CommandModule<{}, { db: string }> = {
  command: "run",
  describe: "Run pending TypeORM migrations",
  builder: (yargs) =>
    yargs.options({
      db: {
        choices: dbConnectionNames,
        default: "defaultdb",
      },
    }),
  handler: async ({ db }) => {
    await runMigration(db as DbConnectionName);
  },
};

export default run;
