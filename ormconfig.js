module.exports = {
  cli: {
    migrationsDir: `server/database/migrations`,
  },
  database: "postgres",
  entities: [`${__dirname}/server/database/entities/*.ts`],
  host: "localhost",
  logging: false,
  migrations: [`${__dirname}/server/database/migrations/*.ts`],
  name: "default",
  password: "admin",
  port: 5432,
  type: "postgres",
  username: "postgres",
};
