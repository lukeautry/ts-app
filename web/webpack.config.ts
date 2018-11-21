import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";

const srcPath = __dirname;
const distPath = path.join(srcPath, "dist");

const config: webpack.Configuration = {
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
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
        }),
        test: /\.scss|sass|css$/,
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
    new ExtractTextPlugin({
      filename: "[name].[hash].css",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};

export default config;
