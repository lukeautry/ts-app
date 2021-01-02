import { Tasks } from "./register-cypress-tasks";

type TaskParams<T> = T extends (p: infer P) => Promise<unknown> ? P : never;

export const getCypressTaskRoute = <K extends keyof Tasks>(
  base: string,
  task: K,
  params: TaskParams<Tasks[K]>
) =>
  `${base}/cypress?task=${task}${Object.entries(params)
    .map(([key, value]) => `&${key}=${value}`)
    .join("")}`;
