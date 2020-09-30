import { DbConnectionName } from "../database/get-db-connection";

interface IEnvironment {
  DB_CONNECTION: DbConnectionName;
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

export const environment: IEnvironment = {
  DB_CONNECTION: getDbConnectionName("DB_CONNECTION"),
};
