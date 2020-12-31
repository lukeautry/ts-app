import http from "http";
import path from "path";
import express from "express";
import { environment } from "../node/environment";
import { log } from "../node/utils/log";
import { getAssetsJSON } from "./common/get-assets-json";
import { registerRoutes } from "./register-routes";
import { registerEmailPreview } from "./register-email-preview";

export const server = () => {
  const app = express()
    .set("view engine", "ejs")
    .use(express.static(".public"));

  app.get("/", async (_req, res) => {
    const assetsJSON = await getAssetsJSON();

    res.render(path.join(__dirname, "../../views/index.ejs"), { assetsJSON });
  });

  const { SERVER_PORT, NODE_ENV } = environment();

  if (NODE_ENV === "dev") {
    registerEmailPreview(app);
  }

  registerRoutes(app);

  return new Promise<http.Server>((resolve) => {
    const s = app.listen(SERVER_PORT, () => {
      log.success(`Started server at http://localhost:${SERVER_PORT}`);
      resolve(s);
    });
  });
};
