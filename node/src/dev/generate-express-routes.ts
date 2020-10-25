import { generateRoutes } from "@tsoa/cli";
import { log } from "../utils/log";
import { Timer } from "../utils/timer";

/**
 * Generates Express routes from TypeScript controllers
 */
export const generateExpressRoutes = async () => {
  const timer = new Timer();
  const metadata = await generateRoutes({
    basePath: "/api",
    entryFile: "",
    routesDir: "./server/src",
    noImplicitAdditionalProperties: "ignore",
    controllerPathGlobs: ["server/src/controllers/**/*-controller.ts"],
  });

  log.success(`Generated Express routes (${timer.elapsed()}ms)`);

  return metadata;
};
