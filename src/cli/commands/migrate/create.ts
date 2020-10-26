import { Arguments, CommandModule } from "yargs";
import { MigrationGenerateCommand } from "typeorm/commands/MigrationGenerateCommand";
import { dbConnectionNames } from "../../../node/database/db-connection-name";

const create: CommandModule<{}, { name: string; db: string }> = {
  command: "create <name>",
  describe: "Create a new TypeORM migration",
  builder: (yargs) =>
    yargs.options({
      name: {
        type: "string",
        required: true,
      },
      db: {
        choices: dbConnectionNames,
        default: "defaultdb",
      },
    }),
  handler: async (args) => {
    const { name, db } = args;

    await new MigrationGenerateCommand().handler(({
      _: ["migration:create"],
      name: name,
      connection: db,
    } as unknown) as Arguments);
  },
};

export default create;
