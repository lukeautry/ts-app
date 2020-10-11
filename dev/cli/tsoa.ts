import { genClient } from "../common/gen-client";
import { generateExpressRoutes } from "../common/gen-routes";

(async () => {
  const metadata = await generateExpressRoutes();
  await genClient(metadata);
})();
