const getPathDependentOptions = () => {
  if (process.env.COMPILED_JS) {
    return {
      entities: [`${__dirname}/dist/node/database/entities/**/*.js`],
      migrations: [`${__dirname}/dist/node/database/migrations/*.js`],
      migrationsDir: "dist/node/database/migrations",
    };
  } else {
    return {
      entities: [`${__dirname}/src/node/database/entities/**/*.ts`],
      migrations: [`${__dirname}/src/node/database/migrations/*.ts`],
      migrationsDir: "src/node/database/migrations",
    };
  }
};

const { entities, migrations, migrationsDir } = getPathDependentOptions();

const baseOptions = {
  cli: {
    migrationsDir,
  },
  entities,
  host: "localhost",
  logging: false,
  migrations,
  password: "admin",
  port: 5432,
  type: "postgres",
  username: "postgres",
  autoLoadEntities: true,
};

module.exports = [
  Object.assign({}, baseOptions, { name: "defaultdb", database: "defaultdb" }),
  Object.assign({}, baseOptions, {
    name: "defaultdb_test",
    database: "defaultdb_test",
    synchronize: true,
    logging: process.env.LOG === "1",
  }),
];
