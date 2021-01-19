import { generateRoutes } from "@tsoa/cli";
import { Tsoa } from "tsoa";
import { log } from "../utils/log";
import { Timer } from "../utils/timer";

/**
 * Generates Express routes from TypeScript controllers
 */
export const generateExpressRoutes = async (cache?: Tsoa.Metadata) => {
  const timer = new Timer();
  const metadata = await generateRoutes(
    {
      basePath: "/api",
      entryFile: "",
      routesDir: "./src/server",
      noImplicitAdditionalProperties: "ignore",
      controllerPathGlobs: ["src/server/controllers/**/*-controller.ts"],
      authenticationModule: "./src/server/middleware.ts",
    },
    undefined,
    undefined,
    cache
  );

  log.success(`Generated Express routes (${timer.elapsed()}ms)`);

  return metadata;
};
