import path from "path";
import AssetsWebpackPlugin from "assets-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import webpack from "webpack";

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
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    ],
  },
  output,
  plugins: [
    new MiniCssExtractPlugin(),
    new AssetsWebpackPlugin({
      removeFullPathAutoPrefix: true,
      path: tmpPath,
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
