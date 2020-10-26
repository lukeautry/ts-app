import fs from "fs";
import path from "path";
import { promisify } from "util";

let assetsJson: IAssetsJSON | undefined;

interface IAssetsJSON {
  web: {
    css: string;
    js: string;
  };
}

const readFile = promisify(fs.readFile);

export const getAssetsJSON = async (): Promise<IAssetsJSON> => {
  if (!assetsJson) {
    const rawJSON = await readFile(
      path.join(__dirname, "../../../.tmp/webpack-assets.json")
    );
    assetsJson = JSON.parse(rawJSON.toString()) as IAssetsJSON;
  }

  return assetsJson;
};
