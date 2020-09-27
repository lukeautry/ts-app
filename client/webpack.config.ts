import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import AssetsWebpackPlugin from "assets-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";

const srcPath = __dirname;
const publicPath = path.join(srcPath, "../public");
const tmpPath = path.join(srcPath, "../tmp");

const config: webpack.Configuration = {
  entry: {
    web: path.join(srcPath, "index.tsx"),
  },
  mode: "development",
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /\.tsx?$/,
      },
      {
        test: /\.scss|sass|css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  output: {
    filename: "[name].[hash].js",
    path: publicPath,
    sourceMapFilename: "[file].map.json",
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",
    }),
    new AssetsWebpackPlugin({
      path: tmpPath,
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  stats: "minimal",
};

export default config;
