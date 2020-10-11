import fs from "fs/promises";
import path from "path";

let assetsJson: IAssetsJSON | undefined;

interface IAssetsJSON {
  web: {
    css: string;
    js: string;
  };
}

export const getAssetsJSON = async (): Promise<IAssetsJSON> => {
  if (!assetsJson) {
    const rawJSON = await fs.readFile(
      path.join(__dirname, "../../tmp/webpack-assets.json")
    );
    assetsJson = JSON.parse(rawJSON.toString()) as IAssetsJSON;
  }

  return assetsJson;
};
