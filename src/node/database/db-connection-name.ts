export const dbConnectionNames = ["defaultdb", "defaultdb_test"] as const;

export type DbConnectionName = typeof dbConnectionNames[number];
