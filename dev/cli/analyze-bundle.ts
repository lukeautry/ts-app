import webpack from "webpack";
import { analyzeWebpackConfig } from "../webpack/webpack.config.analyze";

webpack(analyzeWebpackConfig)
  // noop
  .run(() => ({}));
