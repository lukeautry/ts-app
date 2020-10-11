import http from "http";
import path from "path";
import chalk from "chalk";
import express from "express";
import { log } from "../dev/utils/log";
import { getAssetsJSON } from "./common/get-assets-json";
import { environment } from "./config/environment";
import { registerRoutes } from "./register-routes";

export const server = () => {
  const app = express().set("view engine", "ejs").use(express.static("public"));

  app.get("/", async (_req, res) => {
    const assetsJSON = await getAssetsJSON();

    res.render(path.join(__dirname, "./views/index.ejs"), { assetsJSON });
  });

  registerRoutes(app);

  const { SERVER_PORT } = environment;

  return new Promise<http.Server>((resolve) => {
    const s = app.listen(SERVER_PORT, () => {
      log(
        chalk.blueBright(
          `✓ Started API server at http://localhost:${SERVER_PORT}`
        )
      );
      resolve(s);
    });
  });
};
