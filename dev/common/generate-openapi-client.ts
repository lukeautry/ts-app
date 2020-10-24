import chalk from "chalk";
import { Tsoa } from "tsoa";
import { generate } from "openapi-typescript-codegen";
import { log } from "../utils/log";
import { Timer } from "../utils/timer";
import { generateOpenAPISpec } from "./generate-openapi-spec";

/**
 * Generates the OpenAPI client library
 */
export const generateOpenAPIClient = async (metadata: Tsoa.Metadata) => {
  await generateOpenAPISpec(metadata);

  const timer = new Timer();

  generate({
    input: "./tmp/swagger.json",
    output: "./client/api",
    useOptions: true,
  });

  log(chalk.greenBright(`✓ Generated Client (${timer.elapsed()}ms)`));
};
