import path from "path";
import LiveReloadPlugin from "webpack-livereload-plugin";
import { getWebpackConfig } from "./get-webpack-config";

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
    } as LiveReloadPlugin.Options),
  ],
});
