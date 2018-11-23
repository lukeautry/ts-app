module.exports = {
  cli: {
    migrationsDir: `api/database/migrations`,
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
};

