import chokidar from "chokidar";
import { CommandModule } from "yargs";
import { checkRedis } from "../common/check-redis";
import { generateOpenAPIClient } from "../common/generate-openapi-client";
import { registerQuitKey } from "../common/register-quit-key";
import { startServer } from "../common/start-server";
import { startWebpack } from "../common/start-webpack";
import { log } from "../../node/utils/log";
import { dbConnectionNames } from "../../node/database/db-connection-name";
import { validNodeEnvs } from "../../node/environment";
import { startDocker } from "../../node/dev/start-docker";
import { setupDatabase } from "../../node/dev/setup-database";
import { generateExpressRoutes } from "../../node/dev/generate-express-routes";
import { debounce } from "../../node/utils/debounce";

const start: CommandModule<{}, { db: string; port: string; env: string }> = {
  command: "start",
  describe: "Start developer environment",
  builder: (yargs) =>
    yargs.options({
      env: {
        choices: validNodeEnvs,
        default: "dev",
      },
      db: {
        choices: dbConnectionNames,
        default: "defaultdb",
      },
      port: {
        default: "3000",
      },
    }),
  handler: async ({ db, env, port }) => {
    process.env.DB_CONNECTION = db;
    process.env.NODE_ENV = env;
    process.env.SERVER_PORT = port;

    await startDocker();

    try {
      await Promise.all([setupDatabase(), checkRedis()]);
    } catch (err) {
      log.error(err.message);
      process.exit(1);
    }

    const metadata = await generateExpressRoutes();
    await startWebpack(metadata);
    await startServer();

    const regenerateApiRoutes = debounce(async (args) => {
      const routesChanged =
        args.indexOf("server.ts") !== -1 ||
        args.indexOf("server/controllers") !== -1;

      if (routesChanged) {
        const metadata = await generateExpressRoutes();
        await generateOpenAPIClient(metadata);
      } else {
        await startServer();
      }
    }, 100);

    chokidar
      .watch(["./server/**/*.ts", "./common/**/*.ts", "./node/**/*.ts"])
      .on("change", regenerateApiRoutes);

    registerQuitKey();
  },
};

export default start;
