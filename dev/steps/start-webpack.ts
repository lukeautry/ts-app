import chalk from "chalk";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import config from "../../web/webpack.config";
import { log } from "../utils/log";
import { sleep } from "../utils/sleep";
import { genClient } from "./gen-client";

/**
 * Starts the Webpack Dev Server for UI
 */
export const webpackDevServer = async () => {
  await genClient();

  // for some reason, WebpackDevServer compiles twice on startup without a timeout
  await sleep(1000);

  const options: WebpackDevServer.Configuration = {
    contentBase: "./web/dist",
    host: "localhost",
    stats: "minimal",
  };

  // this is necessary for live reload to work
  WebpackDevServer.addDevServerEntrypoints(config, options);

  const port = 8080;
  const wdServer = new WebpackDevServer(webpack(config), options);

  return new Promise((resolve) => {
    wdServer.listen(port, "localhost", (err) => {
      if (err) {
        log(chalk.red(err.message));
        return;
      }

      log(chalk.blueBright(`✓ Started UI at http://localhost:${port}`));
      resolve();
    });
  });
};
