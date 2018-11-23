import chalk from "chalk";
import { generateRoutes } from "tsoa";
import { log } from "../utils/log";
import { Timer } from "../utils/timer";

/**
 * Generates Express routes from TypeScript controllers
 */
export const generateExpressRoutes = async () => {
  const timer = new Timer();
  await generateRoutes({
    basePath: "/api",
    entryFile: "./api/server.ts",
    routesDir: "./api",
  });

  log(
    chalk.greenBright(`✓ Generated Express routes (${timer.elapsed()}ms)`),
  );
};
