import chalk from "chalk";
import { Tsoa } from "tsoa";
import { log } from "../utils/log";
import { Timer } from "../utils/timer";
import { generateOpenAPISpec } from "./generate-openapi-spec";

// eslint-disable-next-line
const OpenAPI = require("openapi-typescript-codegen");

/**
 * Generates the OpenAPI client library
 */
export const generateOpenAPIClient = async (metadata: Tsoa.Metadata) => {
  await generateOpenAPISpec(metadata);

  const timer = new Timer();

  OpenAPI.generate({
    input: "./tmp/swagger.json",
    output: "./client/api",
    useOptions: true,
  });

  log(chalk.greenBright(`✓ Generated Client (${timer.elapsed()}ms)`));
};
