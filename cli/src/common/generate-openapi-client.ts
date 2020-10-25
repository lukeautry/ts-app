import { Tsoa } from "tsoa";
import { generate } from "openapi-typescript-codegen";
import { log } from "../../../node/src/utils/log";
import { Timer } from "../../../node/src/utils/timer";
import { generateOpenAPISpec } from "./generate-openapi-spec";

/**
 * Generates the OpenAPI client library
 */
export const generateOpenAPIClient = async (metadata: Tsoa.Metadata) => {
  await generateOpenAPISpec(metadata);

  const timer = new Timer();

  generate({
    input: "./.tmp/swagger.json",
    output: "./openapi-client/src",
    useOptions: true,
  });

  log.success(`Generated Client (${timer.elapsed()}ms)`);
};
