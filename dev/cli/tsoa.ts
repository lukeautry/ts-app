import { generateOpenAPIClient } from "../common/generate-openapi-client";
import { generateExpressRoutes } from "../common/generate-express-routes";

(async () => {
  const metadata = await generateExpressRoutes();
  await generateOpenAPIClient(metadata);
})();
