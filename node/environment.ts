import { DbConnectionName } from "./db-connection-name";

interface IEnvironment {
  DB_CONNECTION: DbConnectionName;
  SERVER_PORT: number;
  NODE_ENV: NodeEnvironment;
}

const validConnectionNames: ReadonlyArray<DbConnectionName> = [
  "defaultdb",
  "test",
];

const validNodeEnvs = ["dev", "test", "prod"] as const;
type NodeEnvironment = typeof validNodeEnvs[number];

const getEnvValue = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} not found.`);
  }

  return value;
};

const getConstrainedEnvValue = <T extends string>(
  key: string,
  values: ReadonlyArray<T>
) => {
  const value = getEnvValue(key);

  if (values.includes(value as T)) {
    return value as T;
  }

  throw new Error(`Expected ${key} to be one of ${values.join(",")}`);
};

const serverPort = getEnvValue("SERVER_PORT");

const SERVER_PORT = parseInt(serverPort, 10);
if (isNaN(SERVER_PORT) || SERVER_PORT <= 0) {
  throw new Error(`Expected SERVER_PORT to be a positive integer`);
}

export const environment: IEnvironment = {
  DB_CONNECTION: getConstrainedEnvValue("DB_CONNECTION", validConnectionNames),
  SERVER_PORT,
  NODE_ENV: getConstrainedEnvValue("NODE_ENV", validNodeEnvs),
};
