import path from "path";
import AssetsWebpackPlugin from "assets-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const srcPath = path.join(__dirname, "../../../src/client");
const tmpPath = path.join(__dirname, "../../../.tmp");

interface IGetBaseWebpackConfigParams {
  mode: "development" | "production";
  output: webpack.Configuration["output"];
  plugins?: webpack.Configuration["plugins"];
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
          transpileOnly: true,
        },
      },
    ],
  },
  output,
  plugins: [
    new AssetsWebpackPlugin({
      path: tmpPath,
      removeFullPathAutoPrefix: true,
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    ...plugins,
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  stats: "minimal",
});
