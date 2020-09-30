import { HttpStatusCode } from "./http-status-code";

export class ApiError extends Error {
  constructor(message: string, readonly status: HttpStatusCode) {
    super(message);
  }
}
