import chalk from "chalk";
import { spawn } from "child_process";
import chokidar from "chokidar";
import { generate } from "openapi-ts-client-gen";
import { generateRoutes, generateSwaggerSpec } from "tsoa";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { initializeDbConnection } from "../api/config/postgres";
import { getRedisClient } from "../api/config/redis";
import config from "../web/webpack.config";
import { debounce } from "./utils/debounce";
import { Timer } from "./utils/timer";

/**
 * Single to run API server, webpack dev server, and regenerate route-related content
 */

const c = console;

const checkDbConnection = async () => {
  c.log(chalk.green("Checking PostgreSQL..."));

  try {
    await initializeDbConnection();
    c.log(chalk.greenBright(`✓ PostgreSQL Ready`));
  } catch (err) {
    c.log(
      chalk.redBright(
        `☓ PostgreSQL Not Ready - make sure to 'sh dev/docker/start-docker.sh' first`,
      ),
    );
    throw err;
  }
};

const checkRedisConnection = async () => {
  c.log(chalk.green("Checking Redis Connection..."));

  const redis = getRedisClient();
  return new Promise((resolve, reject) => {
    redis.on("connect", () => {
      c.log(chalk.greenBright(`✓ Redis Ready`));
      resolve();
    });
    redis.on("error", () => {
      c.log(
        chalk.redBright(
          `☓ Redis Not Ready - make sure to 'sh dev/docker/start-docker.sh' first`,
        ),
      );
      reject();
    });
  });
};

(async () => {
  try {
    await Promise.all([checkDbConnection(), checkRedisConnection()]);
  } catch (err) {
    process.exit(1);
  }

  const spec = async () => {
    const timer = new Timer();
    await generateSwaggerSpec({
      basePath: "/api",
      entryFile: "./api/server.ts",
      outputDirectory: "./api/dist",
    });

    c.log(chalk.greenBright(`✓ Generated OpenAPI spec (${timer.elapsed()}ms)`));
  };

  const routes = async () => {
    const timer = new Timer();
    await generateRoutes({
      basePath: "/api",
      entryFile: "./api/server.ts",
      routesDir: "./api",
    });

    c.log(
      chalk.greenBright(`✓ Generated Express routes (${timer.elapsed()}ms)`),
    );
  };

  const client = async () => {
    const timer = new Timer();

    await generate({
      destPath: "./web/api/api.ts",
      namespace: "Api",
      srcPath: "./api/dist/swagger.json",
      type: "file",
    });

    c.log(chalk.greenBright(`✓ Generated client (${timer.elapsed()}ms)`));
  };

  const webpackDevServer = async () => {
    const options: WebpackDevServer.Configuration = {
      contentBase: "./web/dist",
      host: "localhost",
      stats: "minimal",
    };

    // this is necessary for live reload to work
    WebpackDevServer.addDevServerEntrypoints(config, options);

    const port = 8080;
    const server = new WebpackDevServer(webpack(config), options);

    return new Promise((resolve) => {
      server.listen(port, "localhost", (err) => {
        if (err) {
          c.log(chalk.red(err.message));
          return;
        }

        c.log(chalk.green(`UI launched at http://localhost:${port}`));
        resolve();
      });
    });
  };

  await Promise.all([routes(), spec()]);
  await client();
  await webpackDevServer();

  const ls = spawn("nodemon", [
    "--watch",
    "./api/**/*.ts",
    "--exec",
    "ts-node -P ./api/tsconfig.json",
    "./api/server.ts",
  ]);
  ls.stdout.on("data", (data: Buffer) => c.log(data.toString("utf8").trim()));
  ls.stderr.on("data", (data: Buffer) => c.log(data.toString("utf8").trim()));

  const regenerateRoutes = debounce(async (args) => {
    const routesChanged =
      args.indexOf("server.ts") !== -1 ||
      args.indexOf("api/controllers") !== -1;

    if (routesChanged) {
      await Promise.all([spec(), routes()]);
      await client();
    }
  }, 500);

  chokidar.watch("./api/**/*.ts").on("change", regenerateRoutes);
})();
