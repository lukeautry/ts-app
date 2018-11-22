import { Connection, createConnection } from "typeorm";

export let connection: Connection;

export const initializeDbConnection = async (name = "default") => {
  if (connection) {
    return connection;
  }

  connection = await createConnection({
    cli: {
      migrationsDir: `src/database/migrations`,
    },
    database: "postgres",
    entities: [`${__dirname}/api/database/entities/*.ts`],
    host: "localhost",
    logging: false,
    migrations: [`${__dirname}/api/database/migrations/*.ts`],
    name: "default",
    password: "admin",
    port: 5432,
    type: "postgres",
    username: "postgres",
  });
};
