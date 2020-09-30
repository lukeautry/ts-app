import { genClient } from "../steps/gen-client";
import { generateExpressRoutes } from "../steps/gen-routes";

(async () => {
  const metadata = await generateExpressRoutes();
  await genClient(metadata);
})();
