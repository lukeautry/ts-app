import path from "path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { getWebpackConfig } from "./get-webpack-config";

const publicPath = path.join(__dirname, "../../.public");

export const analyzeWebpackConfig = getWebpackConfig({
  mode: "production",
  output: {
    filename: "[name].js",
    path: publicPath,
    sourceMapFilename: "[file].map.json",
  },
  plugins: [new BundleAnalyzerPlugin()],
});
