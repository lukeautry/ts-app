import chalk from "chalk";
import { generate } from "openapi-ts-client-gen";
import { Tsoa } from "tsoa";
import { log } from "../utils/log";
import { Timer } from "../utils/timer";
import { generateOpenAPISpec } from "./openapi-spec";

/**
 * Generates the client library for the UI
 */
export const genClient = async (metadata: Tsoa.Metadata) => {
  await generateOpenAPISpec(metadata);

  const timer = new Timer();

  await generate({
    destPath: "./client/api/api.ts",
    namespace: "Api",
    srcPath: "./tmp/swagger.json",
    type: "file",
  });

  log(chalk.greenBright(`✓ Generated Client (${timer.elapsed()}ms)`));
};
