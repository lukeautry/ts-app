import fs from "fs";
import path from "path";
import { CommandModule } from "yargs";
import rimraf from "rimraf";
import { dbConnectionNames } from "../../node/database/db-connection-name";
import { getDbConnection } from "../../node/database/get-db-connection";
import { environment, validNodeEnvs } from "../../node/environment";
import { log } from "../../node/utils/log";
import { generateExpressRoutes } from "../../node/dev/generate-express-routes";
import { generateOpenAPIClient } from "../common/generate-openapi-client";

const reset: CommandModule<{}, { db: string; port: string; env: string }> = {
  command: "reset",
  describe:
    "Reset development environment and remove starter content, e.g. models/controllers/front-end application",
  builder: (yargs) =>
    yargs.options({
      env: {
        choices: validNodeEnvs,
        default: "dev",
      },
      db: {
        choices: dbConnectionNames,
        default: "defaultdb",
      },
      port: {
        default: "3000",
      },
    }),
  handler: async ({ db, env, port }) => {
    process.env.DB_CONNECTION = db;
    process.env.NODE_ENV = env;
    process.env.SERVER_PORT = port;

    const { DB_CONNECTION } = environment();
    const connection = await getDbConnection(DB_CONNECTION);
    await connection.dropDatabase();
    await connection.close();

    const starterPaths = [
      "./src/common/validation",
      "./src/node/database/entities/user.ts",
      "./src/node/database/migrations",
      "./src/node/database/repositories/user-repository.ts",
      "./src/node/database/repositories/user-repository.spec.ts",
      "./src/server/controllers",
      "./src/server/services",
      "./src/client/App",
    ];

    const getPathFromRoot = (p: string) => path.join(__dirname, "../../..", p);

    starterPaths.forEach((p) => {
      const deletePath = getPathFromRoot(p);
      if (fs.existsSync(deletePath)) {
        rimraf.sync(deletePath);
        log.success(`Deleted ${deletePath}`);
      }
    });

    const replacements: Record<string, string> = {
      "./src/common/index.ts": "",
      "./src/client/index.tsx": `import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<div>empty</div>, document.getElementById("app"));\r\n`,
      "./src/server/controllers/init-controller.ts": `import { Get, Route, Tags } from "tsoa";

@Route("init")
export class InitController {
  @Get()
  @Tags("Init")
  public async GetValue() {
    return "init";
  }
}\r\n`,
    };

    const controllersDir = getPathFromRoot("./src/server/controllers");
    fs.mkdirSync(controllersDir);
    log.success(`Created ${controllersDir}`);

    Object.keys(replacements).forEach((p) => {
      const content = replacements[p];
      fs.writeFileSync(getPathFromRoot(p), content);
      log.success(`Created ${p}`);
    });

    const metadata = await generateExpressRoutes();
    await generateOpenAPIClient(metadata);
  },
};

export default reset;
