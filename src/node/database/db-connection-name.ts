export const dbConnectionNames = ["echochamber", "echochamber_test"] as const;

export type DbConnectionName = typeof dbConnectionNames[number];
