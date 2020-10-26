export const dbConnectionNames = ["defaultdb", "test"] as const;

export type DbConnectionName = typeof dbConnectionNames[number];
