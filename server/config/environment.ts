import { DbConnectionName } from "../database/get-db-connection";

interface IEnvironment {
  DB_CONNECTION: DbConnectionName;
  SERVER_PORT: number;
}

const validConnectionNames: ReadonlyArray<DbConnectionName> = [
  "defaultdb",
  "test",
];

const getEnvValue = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} not found.`);
  }

  return value;
};

const getDbConnectionName = (key: string): DbConnectionName => {
  const value = getEnvValue(key);

  if (validConnectionNames.includes(value as DbConnectionName)) {
    return value as DbConnectionName;
  } else {
    throw new Error(
      `Expected ${key} to be one of ${validConnectionNames.join(",")}`
    );
  }
};

const serverPort = getEnvValue("SERVER_PORT");

const SERVER_PORT = parseInt(serverPort, 10);
if (isNaN(SERVER_PORT) || SERVER_PORT <= 0) {
  throw new Error(`Expected SERVER_PORT to be a positive integer`);
}

export const environment: IEnvironment = {
  DB_CONNECTION: getDbConnectionName("DB_CONNECTION"),
  SERVER_PORT,
};
