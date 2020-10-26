import path from "path";
import AssetsWebpackPlugin from "assets-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";

const srcPath = path.join(__dirname, "../../../src/client");
const tmpPath = path.join(__dirname, "../../../.tmp");

interface IGetBaseWebpackConfigParams {
  mode: "development" | "production";
  output: webpack.Output;
  plugins?: Array<webpack.Plugin>;
}

export const getWebpackConfig = ({
  output,
  plugins = [],
  mode,
}: IGetBaseWebpackConfigParams): webpack.Configuration => ({
  entry: {
    web: path.join(srcPath, "index.tsx"),
  },
  mode,
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /\.tsx?$/,
        options: {
          projectReferences: true,
        },
      },
    ],
  },
  output,
  plugins: [
    new AssetsWebpackPlugin({
      path: tmpPath,
    }),
    new CleanWebpackPlugin(),
    ...plugins,
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  stats: "minimal",
});
