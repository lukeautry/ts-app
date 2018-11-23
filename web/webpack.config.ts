import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import webpack from "webpack";

const srcPath = __dirname;
const distPath = path.join(srcPath, "dist");

const config: webpack.Configuration = {
  devServer: {
    stats: "minimal",
  },
  entry: {
    index: path.join(srcPath, "index.tsx"),
  },
  mode: "development",
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /\.tsx?$/,
      },
      {
        loader: "tslint-loader",
        test: /\.tsx?$/,
      },
      {
        test: /\.scss|sass|css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    filename: "[name].[hash].js",
    path: distPath,
    sourceMapFilename: "[file].map.json",
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["index"],
      template: path.join(srcPath, "index.ejs"),
      title: "<PAGE TITLE>",
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  stats: "minimal",
};

export default config;
