import { generateSpec } from "@tsoa/cli";
import { Tsoa } from "tsoa";
import { log } from "../../../node/src/utils/log";
import { Timer } from "../../../node/src/utils/timer";

/**
 * Generates Open API/Swagger specification file
 */
export const generateOpenAPISpec = async (metadata?: Tsoa.Metadata) => {
  const timer = new Timer();
  await generateSpec(
    {
      basePath: "/api",
      entryFile: "",
      outputDirectory: "./.tmp",
      noImplicitAdditionalProperties: "ignore",
      controllerPathGlobs: ["server/src/controllers/**/*-controller.ts"],
      specVersion: 3,
    },
    undefined,
    undefined,
    metadata
  );

  log.success(`Generated OpenAPI spec (${timer.elapsed()}ms)`);
};
