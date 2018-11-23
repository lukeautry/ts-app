import chalk from "chalk";
import { generate } from "openapi-ts-client-gen";
import { log } from "../utils/log";
import { Timer } from "../utils/timer";
import { generateOpenAPISpec } from "./openapi-spec";

/**
 * Generates the client library for the UI
 */
export const genClient = async () => {
  await generateOpenAPISpec();

  const timer = new Timer();

  await generate({
    destPath: "./web/api/api.ts",
    namespace: "Api",
    srcPath: "./api/dist/swagger.json",
    type: "file",
  });

  log(chalk.greenBright(`✓ Generated Client (${timer.elapsed()}ms)`));
};
