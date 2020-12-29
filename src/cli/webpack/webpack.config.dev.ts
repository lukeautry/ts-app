import path from "path";
import { getWebpackConfig } from "./get-webpack-config";

// TODO: Use upstream package when fixed
// eslint-disable-next-line @typescript-eslint/no-var-requires
const LiveReloadPlugin = require("@kooneko/livereload-webpack-plugin");

const publicPath = path.join(__dirname, "../../../.public");

export const devWebpackConfig = getWebpackConfig({
  mode: "development",
  output: {
    filename: "[name].js",
    path: publicPath,
    sourceMapFilename: "[file].map.json",
  },
  plugins: [
    new LiveReloadPlugin({
      quiet: true,
    }),
  ],
});
