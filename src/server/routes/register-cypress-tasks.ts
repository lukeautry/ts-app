import { Express } from "express";
import { UserRepository } from "../../node/database/repositories/user-repository";
import { VerificationTokenRepository } from "../../node/database/repositories/verification-token-repository";
import { getBaseUrl } from "../../node/environment";
import { HttpStatusCode } from "../common/http-status-code";
import { getEmailService } from "../services/email-service";
import { UserService } from "../services/user-service";
import { getEmailPreviewRoute } from "./get-email-preview-route";

export interface ICreateUserParams {
  username: string;
  email: string;
  password: string;
}

const tasks = {
  async createUser({ username, email, password }: ICreateUserParams) {
    await new UserRepository().delete({});
    return await new UserService(getEmailService()).register({
      username,
      email,
      password,
    });
  },
  async deleteUserByEmail({ email }: { email: string }) {
    await new UserRepository().delete({ email });
    return {};
  },
  async getResetPasswordEmailUrl({ email }: { email: string }) {
    const user = await new UserRepository().findOne({ where: { email } });
    if (!user) {
      throw new Error(`no user with email ${email}`);
    }

    const token = await new VerificationTokenRepository().findOne({
      where: { user_id: user.id },
    });
    if (!token) {
      throw new Error(`no token with user ID ${user.id}`);
    }

    return {
      url: getEmailPreviewRoute(getBaseUrl(), "reset-password", {
        resetUrl: encodeURIComponent(
          UserService.getResetPasswordUrl(token.value)
        ),
      }),
    };
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
