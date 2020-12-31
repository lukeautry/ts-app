export const dbConnectionNames = ["saas", "saas_test"] as const;

export type DbConnectionName = typeof dbConnectionNames[number];
