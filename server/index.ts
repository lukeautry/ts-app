import http from "http";
import path from "path";
import bodyParser from "body-parser";
import chalk from "chalk";
import express from "express";
import methodOverride from "method-override";
import { log } from "../dev/utils/log";
import { getAssetsJSON } from "./utils/get-assets-json";
import { environment } from "./config/environment";
import { registerRoutes } from "./register-routes";

export const server = () => {
  const app = express()
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(methodOverride())
    .use((_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        `Origin, X-Requested-With, Content-Type, Accept, Authorization`
      );
      next();
    })
    .set("view engine", "ejs")
    .use(express.static("public"));

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
