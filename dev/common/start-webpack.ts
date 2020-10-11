import chalk from "chalk";
import { Tsoa } from "tsoa";
import webpack from "webpack";
import { devWebpackConfig } from "../webpack/webpack.config.dev";
import { log } from "../utils/log";
import { sleep } from "../utils/sleep";
import { prodWebpackConfig } from "../webpack/webpack.config.prod";
import { generateOpenAPIClient } from "./generate-openapi-client";

const envConfigs = {
  prod: prodWebpackConfig,
  dev: devWebpackConfig,
};

const getConfig = () => {
  const { NODE_ENV } = process.env;
  if (!NODE_ENV || !(NODE_ENV in envConfigs)) {
    throw new Error(
      `Expected NODE_ENV to be one of ${Object.keys(envConfigs).join(", ")}`
    );
  }

  return envConfigs[NODE_ENV as keyof typeof envConfigs];
};

export const startWebpack = async (metadata: Tsoa.Metadata) => {
  await generateOpenAPIClient(metadata);

  // somehow prevents compiling twice on webpack start
  await sleep(1000);

  const compiler = webpack(getConfig());

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
