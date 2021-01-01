import { Express } from "express";
import { UserRepository } from "../node/database/repositories/user-repository";
import { HttpStatusCode } from "./common/http-status-code";
import { getEmailService } from "./services/email-service";
import { UserService } from "./services/user-service";

export interface ICreateUserParams {
  email: string;
  password: string;
  name: string;
}

const tasks = {
  async createUser({ email, password, name }: ICreateUserParams) {
    await new UserRepository().delete({
      email,
    });
    return await new UserService(getEmailService()).register({
      email,
      password,
      name,
    });
  },
  async deleteUserByEmail({ email }: { email: string }) {
    await new UserRepository().delete({ email });
    return {};
  },
};

export type Tasks = typeof tasks;

export const registerCypressTasks = (app: Express) => {
  app.get("/cypress", async (req, res) => {
    res.set("Content-Type", "application/json");

    const { task } = req.query;
    if (!task || typeof task !== "string") {
      return res.status(HttpStatusCode.BAD_REQUEST).send({
        error: "must provide task parameter",
      });
    }

    if (!(task in tasks)) {
      return res.status(HttpStatusCode.BAD_REQUEST).send({
        error: `task must be one of ${Object.keys(tasks).join(", ")}`,
      });
    }

    const taskHandler = tasks[task as keyof Tasks];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await taskHandler(req.query as any);

    res.status(HttpStatusCode.OK).send(result);
  });
};
