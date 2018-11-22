import chalk from "chalk";
import { spawn } from "child_process";
import chokidar from "chokidar";
import { generate } from "openapi-ts-client-gen";
import { generateRoutes, generateSwaggerSpec } from "tsoa";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import config from "../web/webpack.config";
import { debounce } from "./utils/debounce";
import { Timer } from "./utils/timer";

const c = console;

const spec = () => {
  const timer = new Timer();
  generateSwaggerSpec({
    basePath: "/api",
    entryFile: "./api/server.ts",
    outputDirectory: "./api/dist",
  });

  c.log(chalk.greenBright(`✓ Generated OpenAPI spec (${timer.elapsed()}ms)`));
};

const routes = () => {
  const timer = new Timer();
  generateRoutes({
    basePath: "/api",
    entryFile: "./api/server.ts",
    routesDir: "./api",
  });

  c.log(chalk.greenBright(`✓ Generated Express routes (${timer.elapsed()}ms)`));
};

const client = () => {
  const timer = new Timer();
  generate({
    destPath: "./web/api/api.ts",
    namespace: "Api",
    onSuccess: () => {
      c.log(chalk.greenBright(`✓ Generated client (${timer.elapsed()}ms)`));
    },
    srcPath: "./api/dist/swagger.json",
    type: "file",
  });
};

spec();
client();
routes();

const ls = spawn("nodemon", [
  "--watch",
  "./api/**/*.ts",
  "--exec",
  "ts-node -P ./api/tsconfig.json",
  "./api/server.ts",
]);
ls.stdout.on("data", (data: Buffer) => c.log(data.toString("utf8").trim()));
ls.stderr.on("data", (data: Buffer) => c.log(data.toString("utf8").trim()));

const regenerateAndRestartServer = debounce((args) => {
  const routesChanged =
    args.indexOf("server.ts") !== -1 || args.indexOf("api/controllers") !== -1;

  if (routesChanged) {
    spec();
    client();
    routes();
  }

  // API has changed in some way
  // We need to: regenerate routes, regenerate swagger, restart server, regenerate client
}, 500);

chokidar.watch("./api/**/*.ts").on("change", regenerateAndRestartServer);

const launchWebpackDevServer = () => {
  const options: WebpackDevServer.Configuration = {
    contentBase: "./web/dist",
    host: "localhost",
    stats: "minimal",
  };

  WebpackDevServer.addDevServerEntrypoints(config, options);

  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, options);

  const port = 8080;
  server.listen(port, "localhost", (err) => {
    if (err) {
      c.log(chalk.red(err.message));
      return;
    }

    c.log(chalk.green(`UI launched at http://localhost:${port}`));
  });
};

launchWebpackDevServer();
