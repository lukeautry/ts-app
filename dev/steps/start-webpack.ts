import chalk from "chalk";
import { Tsoa } from "tsoa";
import webpack from "webpack";
import { devWebpackConfig } from "../webpack/webpack.config.dev";
import { log } from "../utils/log";
import { sleep } from "../utils/sleep";
import { genClient } from "./gen-client";

export const webpackDevServer = async (metadata: Tsoa.Metadata) => {
  await genClient(metadata);

  // somehow prevents compiling twice on webpack start
  await sleep(1000);

  const compiler = webpack(devWebpackConfig);

  return new Promise((resolve) => {
    compiler.watch({}, (err, stats) => {
      if (err) {
        log(chalk.red(err.message));
        return;
      }

      if (!stats.hasErrors()) {
        log(
          chalk.greenBright(
            `✓ Webpack Compiled (${+stats.endTime! - +stats.startTime!}ms)`
          )
        );
      } else {
        log(stats.toString("minimal"));
      }

      resolve();
    });
  });
};
