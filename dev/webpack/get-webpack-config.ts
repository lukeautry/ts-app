import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import AssetsWebpackPlugin from "assets-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";

const srcPath = path.join(__dirname, "../../client");
const tmpPath = path.join(__dirname, "../../tmp");

interface IGetBaseWebpackConfigParams {
  mode: "development" | "production";
  output: webpack.Output;
  plugins?: Array<webpack.Plugin>;
  cssFileName: string;
}

export const getWebpackConfig = ({
  output,
  plugins = [],
  cssFileName,
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
          compilerOptions: {
            target: "es5",
          },
        },
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
      filename: cssFileName,
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
