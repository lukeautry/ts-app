import { environment } from "../../node/environment";
import { log } from "../../node/utils/log";

export interface ISendOptions {
  to: string;
  subject: string;
  content: string;
}

export interface IEmailService {
  send(options: ISendOptions): Promise<void>;
}

class DevEmailService implements IEmailService {
  async send(options: ISendOptions) {
    log.custom(`${options.content}`);
  }
}

export const getEmailService = (): IEmailService => {
  const { NODE_ENV } = environment();
  if (NODE_ENV === "dev" || NODE_ENV === "test") {
    return new DevEmailService();
  }

  throw new Error(`EmailService not implemented for ${NODE_ENV}`);
};
