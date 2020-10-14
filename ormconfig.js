const baseOptions = {
  cli: {
    migrationsDir: `node/database/migrations`,
  },
  entities: [`${__dirname}/node/database/entities/**/*.ts`],
  host: "localhost",
  logging: false,
  migrations: [`${__dirname}/node/database/migrations/*.ts`],
  password: "admin",
  port: 5432,
  type: "postgres",
  username: "postgres",
  autoLoadEntities: true,
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
