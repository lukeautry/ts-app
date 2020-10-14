import http from "http";
import path from "path";
import chalk from "chalk";
import express from "express";
import { environment } from "../node/environment";
import { getAssetsJSON } from "./common/get-assets-json";
import { registerRoutes } from "./register-routes";
import { log } from "./common/log";

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
        chalk.blueBright(`✓ Started server at http://localhost:${SERVER_PORT}`)
      );
      resolve(s);
    });
  });
};
