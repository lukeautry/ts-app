import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import AssetsWebpackPlugin from "assets-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";

const srcPath = path.join(__dirname, "../../client");
const tmpPath = path.join(__dirname, "../../tmp");

interface IGetBaseWebpackConfigParams {
  output: webpack.Output;
  plugins?: Array<webpack.Plugin>;
}

export const getWebpackConfig = ({
  output,
  plugins = [],
}: IGetBaseWebpackConfigParams): webpack.Configuration => ({
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
  output,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
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
