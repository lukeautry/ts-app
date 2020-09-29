import chokidar from "chokidar";
import { checkRedis } from "./steps/check-redis";
import { genClient } from "./steps/gen-client";
import { generateExpressRoutes } from "./steps/gen-routes";
import { registerQuitKey } from "./steps/register-quit-key";
import { startServer } from "./steps/start-server";
import { startDocker } from "./steps/start-docker";
import { webpackDevServer } from "./steps/start-webpack";
import { debounce } from "./utils/debounce";
import { setupDatabase } from "./steps/setup-db";

/**
 * Single function to run API server, webpack dev server, and regenerate route-related content
 */
(async () => {
  await startDocker();

  try {
    await Promise.all([setupDatabase("defaultdb"), checkRedis()]);
  } catch (err) {
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
