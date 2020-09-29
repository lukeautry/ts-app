import path from "path";
import { getWebpackConfig } from "./get-webpack-config";

const publicPath = path.join(__dirname, "../public");

export const prodWebpackConfig = getWebpackConfig({
  output: {
    filename: "[name].[hash].js",
    path: publicPath,
  },
  // TODO: Minification, etc
});
