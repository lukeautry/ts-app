// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (webpackConfig) => {
  webpackConfig.resolve.extensions.push(".css");

  webpackConfig.plugins.push(new MiniCssExtractPlugin());

  const tsLoaderRule = webpackConfig.module.rules.find(rule => rule.loader.includes('ts-loader'));
  tsLoaderRule.options = {
    projectReferences: true,
  };

  webpackConfig.module.rules.push(
    {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    },
    {
      test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
      loader: "url-loader?limit=100000",
    }
  );

  return { ...webpackConfig /* do your thing */ };
};
