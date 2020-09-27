import chalk from "chalk";
import { Tsoa } from "tsoa";
import webpack from "webpack";
import config from "../../client/webpack.config";
import { log } from "../utils/log";
import { sleep } from "../utils/sleep";
import { genClient } from "./gen-client";

export const webpackDevServer = async (metadata: Tsoa.Metadata) => {
  await genClient(metadata);

  // somehow prevents compiling twice on webpack start
  await sleep(1000);

  const compiler = webpack(config);

  return new Promise((resolve) => {
    compiler.watch({}, (err, stats) => {
      if (err) {
        log(chalk.red(err.message));
        return;
      }

      if (!stats.hasErrors()) {
        log(`[wp] compilation success`);
      } else {
        log(stats.toString("minimal"));
      }

      resolve();
    });
  });
};
