import { CommandModule } from "yargs";
import { generateExpressRoutes } from "../../node/dev/generate-express-routes";
import { generateOpenAPIClient } from "../common/generate-openapi-client";

const tsoa: CommandModule<{}> = {
  command: "tsoa",
  describe: "Generate tsoa routes and API client",
  handler: async () => {
    const metadata = await generateExpressRoutes();
    await generateOpenAPIClient(metadata);
  },
};

export default tsoa;
