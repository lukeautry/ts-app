import bodyParser from "body-parser";
import express from "express";
import methodOverride from "method-override";
import { ValidateError } from "tsoa";
import { environment } from "../node/environment";
import { log } from "../node/utils/log";
import { RegisterRoutes } from "./routes";
import { HttpStatusCode } from "./common/http-status-code";
import { OperationError } from "./common/operation-error";

interface IError {
  status?: number;
  fields?: string[];
  message?: string;
  name?: string;
}

export const registerRoutes = (app: express.Express) => {
  app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(methodOverride())
    .use((_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        `Origin, X-Requested-With, Content-Type, Accept, Authorization`
      );
      next();
    });

  RegisterRoutes(app);

  const getErrorBody = (err: unknown) => {
    if (err instanceof ValidateError) {
      return {
        message: err.message,
        status: HttpStatusCode.BAD_REQUEST,
        fields: err.fields,
        name: err.name,
      };
    } else if (err instanceof OperationError) {
      return {
        message: err.message,
        status: err.status,
      };
    } else {
      return {
        message: "UNKNOWN_ERROR",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  };

  app.use(
    (
      err: IError,
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (environment().NODE_ENV === "dev") {
        log.error(err);
      }

      const body = getErrorBody(err);
      res.status(body.status).json(body);
      next();
    }
  );
};
