import path from "path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import { getWebpackConfig } from "./get-webpack-config";

const publicPath = path.join(__dirname, "../../.public");

const smp = new SpeedMeasurePlugin();

export const analyzeWebpackConfig = smp.wrap(
  getWebpackConfig({
    mode: "production",
    output: {
      filename: "[name].js",
      path: publicPath,
      sourceMapFilename: "[file].map.json",
    },
    plugins: [new BundleAnalyzerPlugin()],
  })
);
