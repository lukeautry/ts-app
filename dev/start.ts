import chokidar from "chokidar";
import { checkDb } from "./steps/check-db";
import { checkRedis } from "./steps/check-redis";
import { genClient } from "./steps/gen-client";
import { generateExpressRoutes } from "./steps/gen-routes";
import { registerQuitKey } from "./steps/register-quit-key";
import { startApi } from "./steps/start-api";
import { startDocker } from "./steps/start-docker";
import { webpackDevServer } from "./steps/start-webpack";
import { debounce } from "./utils/debounce";

/**
 * Single to run API server, webpack dev server, and regenerate route-related content
 */

(async () => {
  await startDocker();

  try {
    await Promise.all([checkDb(), checkRedis()]);
  } catch (err) {
    process.exit(1);
  }

  await Promise.all([
    generateExpressRoutes().then(() => startApi()),
    webpackDevServer(),
  ]);

  const regenerateApiRoutes = debounce(async (args) => {
    const routesChanged =
      args.indexOf("server.ts") !== -1 ||
      args.indexOf("api/controllers") !== -1;

    if (routesChanged) {
      await Promise.all([genClient(), generateExpressRoutes()]);
    } else {
      await startApi();
    }
  }, 100);

  chokidar.watch("./api/**/*.ts").on("change", regenerateApiRoutes);

  registerQuitKey();
})();
