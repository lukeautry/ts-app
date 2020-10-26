import webpack from "webpack";
import { CommandModule } from "yargs";
import { analyzeWebpackConfig } from "../../webpack/webpack.config.analyze";

const analyze: CommandModule<{}> = {
  command: "analyze",
  describe: "Analyze webpack bundle",
  handler: async () => {
    webpack(analyzeWebpackConfig).run(() => ({}));
  },
};

export default analyze;
