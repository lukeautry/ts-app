import { Tsoa } from "tsoa";
import webpack from "webpack";
import { devWebpackConfig } from "../webpack/webpack.config.dev";
import { sleep } from "../../node/utils/sleep";
import { prodWebpackConfig } from "../webpack/webpack.config.prod";
import { environment } from "../../node/environment";
import { log } from "../../node/utils/log";
import { generateOpenAPIClient } from "./generate-openapi-client";

const envConfigs = {
  prod: prodWebpackConfig,
  dev: devWebpackConfig,
  test: devWebpackConfig,
};

const getConfig = () => {
  const { NODE_ENV } = environment();
  return envConfigs[NODE_ENV];
};

export const startWebpack = async (metadata: Tsoa.Metadata) => {
  await generateOpenAPIClient(metadata);

  // somehow prevents compiling twice on webpack start
  await sleep(1000);

  const compiler = webpack(getConfig());

  return new Promise((resolve) => {
    compiler.watch({}, (err, stats) => {
      if (err) {
        log.error(err.message);
        return;
      }

      if (!stats.hasErrors()) {
        log.success(
          `Webpack Compiled (${+stats.endTime! - +stats.startTime!}ms)`
        );
      } else {
        log.success(stats.toString("minimal"));
      }

      resolve();
    });
  });
};
