import http from "http";
import path from "path";
import bodyParser from "body-parser";
import chalk from "chalk";
import express from "express";
import methodOverride from "method-override";
import { log } from "../dev/utils/log";
import { RegisterRoutes } from "./routes";
import { getAssetsJSON } from "./utils/get-assets-json";

interface IError {
  status?: number;
  fields?: string[];
  message?: string;
  name?: string;
}

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

  RegisterRoutes(app);

  app.use(
    (
      err: IError,
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const status = err.status || 500;
      const body = {
        fields: err.fields || undefined,
        message: err.message || "An error occurred during the request.",
        name: err.name,
        status,
      };
      res.status(status).json(body);
      next();
    }
  );

  const port = 3000;

  return new Promise<http.Server>((resolve) => {
    const s = app.listen(port, () => {
      log(chalk.blueBright(`✓ Started API server at http://localhost:${port}`));
      resolve(s);
    });
  });
};
