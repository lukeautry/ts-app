import { CommandModule } from "yargs";
import Cypress from "cypress";
import { startDocker } from "../../../node/dev/start-docker";
import { setupDatabase } from "../../../node/dev/setup-database";
import { checkRedis } from "../../common/check-redis";
import { log } from "../../../node/utils/log";
import { generateExpressRoutes } from "../../../node/dev/generate-express-routes";
import { startWebpack } from "../../common/start-webpack";
import { startServer } from "../../common/start-server";
import { createSeedData } from "../../common/create-seed-data";

const cypress: CommandModule<{}, {}> = {
  command: "cypress",
  describe: "Run Cypress Tests",
  handler: async () => {
    process.env.DB_CONNECTION = "defaultdb_test";
    process.env.NODE_ENV = "test";
    process.env.SERVER_PORT = "3037";

    await startDocker();

    try {
      await Promise.all([setupDatabase(false), checkRedis()]);
    } catch (err) {
      log.error(err.message);
      process.exit(1);
    }

    const metadata = await generateExpressRoutes();
    await startWebpack(metadata);
    await startServer();

    await createSeedData();

    await Cypress.run();
    process.exit(0);
  },
};

export default cypress;
