const baseOptions = {
  cli: {
    migrationsDir: `server/database/migrations`,
  },
  entities: [`${__dirname}/server/database/entities/**/*.ts`],
  host: "localhost",
  logging: false,
  migrations: [`${__dirname}/server/database/migrations/*.ts`],
  password: "admin",
  port: 5432,
  type: "postgres",
  username: "postgres",
};

module.exports = [
  Object.assign({}, baseOptions, { name: "defaultdb", database: "defaultdb" }),
  Object.assign({}, baseOptions, {
    name: "test",
    database: "test",
    synchronize: true,
    logging: process.env.LOG === "1",
  }),
];
