import chokidar from "chokidar";
import chalk from "chalk";
import { checkRedis } from "../common/check-redis";
import { genClient } from "../common/gen-client";
import { generateExpressRoutes } from "../common/gen-routes";
import { registerQuitKey } from "../common/register-quit-key";
import { startServer } from "../common/start-server";
import { startDocker } from "../common/start-docker";
import { webpackDevServer } from "../common/start-webpack";
import { debounce } from "../utils/debounce";
import { setupDatabase } from "../common/setup-db";
import { log } from "../utils/log";

/**
 * Single function to run API server, webpack watcher, and regenerate route-related content
 */
(async () => {
  await startDocker();

  try {
    await Promise.all([setupDatabase(), checkRedis()]);
  } catch (err) {
    log(chalk.red(err.message));
    process.exit(1);
  }

  const metadata = await generateExpressRoutes();
  await Promise.all([startServer(), webpackDevServer(metadata)]);

  const regenerateApiRoutes = debounce(async (args) => {
    const routesChanged =
      args.indexOf("server.ts") !== -1 ||
      args.indexOf("server/controllers") !== -1;

    if (routesChanged) {
      const metadata = await generateExpressRoutes();
      await genClient(metadata);
    } else {
      await startServer();
    }
  }, 100);

  chokidar.watch("./server/**/*.ts").on("change", regenerateApiRoutes);

  registerQuitKey();
})();
