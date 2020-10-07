import express from "express";
import { RegisterRoutes } from "./routes";

interface IError {
  status?: number;
  fields?: string[];
  message?: string;
  name?: string;
}

export const registerRoutes = (app: express.Express) => {
  RegisterRoutes(app);

  app.use(
    (
      err: IError,
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const status = err.status || 500;
      const body = {
        fields: err.fields || undefined,
        message: err.message || "An error occurred during the request.",
        name: err.name,
        status,
      };
      res.status(status).json(body);
      next();
    }
  );
};
