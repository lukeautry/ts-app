import { PostgresError } from "../../node/database/postgres/postgres-error";
import { PostgresErrorCode } from "../../node/database/postgres/postgres-error-codes";
import { UserRepository } from "../../node/database/repositories/user-repository";
import { HttpStatusCode } from "../common/http-status-code";
import { OperationError } from "../common/operation-error";
import { isValidEmail } from "../../common/validation/is-valid-email";
import { validatePasswordRequirements } from "../../common/validation/validate-password-requirements";
import { log } from "../../node/utils/log";
import {
  IUser,
  UNIQUE_USERNAME_KEY,
  UNIQUE_EMAIL_KEY,
} from "../../node/database/entities/user";
import { renderResetPassword } from "../../email/templates/ResetEmail";
import { getBaseUrl } from "../../node/environment";
import { getPath } from "../../common/paths";
import { AuthenticationService, IAccessToken } from "./authentication-service";
import { UserPasswordService } from "./user-password-service";
import { VerificationTokenService } from "./verification-token-service";
import { IEmailService } from "./email-service";

interface IUserCreateParams {
  username: string;
  email: string;
}

export interface IUserRegisterParams {
  username: string;
  email: string;
  password: string;
}

export interface IUpdateUserParams {
  email: string;
}

export interface IChangePasswordParams {
  oldPassword: string;
  newPassword: string;
}

export interface IConsumeResetPasswordParams {
  token: string;
  password: string;
}

export class UserService {
  constructor(private readonly emailService: IEmailService) {}

  static getResetPasswordUrl(token: string) {
    return `${getBaseUrl()}/#${getPath((p) => p.resetPassword, {
      token,
    })}`;
  }

  async getById(id: number) {
    const result = await this.repository.findOne({
      where: {
        id,
      },
    });
    if (!result) {
      throw new OperationError("NOT_FOUND", HttpStatusCode.NOT_FOUND);
    }

    return result;
  }

  async create({ username, email }: IUserCreateParams) {
    this.validateEmail(email);

    try {
      return await this.repository.create({
        username,
        email,
      });
    } catch (err) {
      this.checkForDuplicateFields(err);

      throw err;
    }
  }

  private checkForDuplicateFields(err: unknown) {
    if (
      err instanceof PostgresError &&
      err.code === PostgresErrorCode.UNIQUE_VIOLATION
    ) {
      const { constraint } = err.queryError;
      if (constraint === UNIQUE_EMAIL_KEY) {
        throw new OperationError("EMAIL_IN_USE", HttpStatusCode.BAD_REQUEST);
      } else if (constraint === UNIQUE_USERNAME_KEY) {
        throw new OperationError("USERNAME_IN_USE", HttpStatusCode.BAD_REQUEST);
      }
    }
  }

  async register({ username, email, password }: IUserRegisterParams) {
    const passwordValidation = validatePasswordRequirements(password);
    if (!passwordValidation.success) {
      throw new OperationError(
        "INVALID_PASSWORD",
        HttpStatusCode.BAD_REQUEST,
        passwordValidation.error
      );
    }

    const user = await this.create({ username, email });
    await this.passwordService.setPassword({ userId: user.id, password });

    return new AuthenticationService().login({
      username,
      password,
    });
  }

  async update(user: IUser, { email }: IUpdateUserParams) {
    this.validateEmail(email);

    try {
      return await this.repository.update({
        ...user,
        email,
      });
    } catch (err) {
      this.checkForDuplicateFields(err);
      log.error(err.message);

      throw err;
    }
  }

  async changePassword(user: IUser, params: IChangePasswordParams) {
    this.validateChangePassword(params);

    const passwordService = new UserPasswordService();
    const isMatchingPassword = await passwordService.isValidPassword(
      user.id,
      params.oldPassword
    );
    if (!isMatchingPassword) {
      throw new OperationError(
        "INVALID_PASSWORD",
        HttpStatusCode.BAD_REQUEST,
        "Provided current password is invalid"
      );
    }

    const isValidNewPassword = validatePasswordRequirements(params.newPassword);
    if (!isValidNewPassword.success) {
      throw new OperationError(
        "INVALID_PASSWORD",
        HttpStatusCode.BAD_REQUEST,
        isValidNewPassword.error
      );
    }

    await passwordService.setPassword({
      userId: user.id,
      password: params.newPassword,
    });
  }

  async resetPassword(email: string) {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new OperationError(
        "INVALID_EMAIL",
        HttpStatusCode.NOT_FOUND,
        "No user with this email found"
      );
    }

    const token = await new VerificationTokenService().create({
      userId: user.id,
      type: "reset_password",
    });

    const url = UserService.getResetPasswordUrl(token.value);

    await this.emailService.send({
      to: email,
      subject: "Reset Email",
      content: renderResetPassword({
        resetUrl: url,
      }),
    });
  }

  async consumeResetPassword({
    token,
    password,
  }: IConsumeResetPasswordParams): Promise<IAccessToken> {
    const confirmation = await new VerificationTokenService().consume(token);

    const user = await this.repository.findOne({
      where: { id: confirmation.user_id },
    });
    if (!user) {
      log.error(
        `attempted to find user ${confirmation.user_id} but nothing turned up`
      );
      throw new OperationError(
        "UNKNOWN_ERROR",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }

    const passwordValidationResult = validatePasswordRequirements(password);
    if (!passwordValidationResult.success) {
      throw new OperationError(
        "INVALID_PASSWORD",
        HttpStatusCode.BAD_REQUEST,
        passwordValidationResult.error
      );
    }

    await new UserPasswordService().setPassword({ userId: user.id, password });
    return new AuthenticationService().getUserAccessToken(user);
  }

  private validateChangePassword({
    oldPassword,
    newPassword,
  }: IChangePasswordParams) {
    if (!oldPassword) {
      throw new OperationError(
        "INVALID_PARAMETERS",
        HttpStatusCode.BAD_REQUEST,
        "oldPassword must have a value."
      );
    }

    if (!newPassword) {
      throw new OperationError(
        "INVALID_PARAMETERS",
        HttpStatusCode.BAD_REQUEST,
        "newPassword must have a value."
      );
    }
  }

  private validateEmail(email: string) {
    if (!isValidEmail(email)) {
      throw new OperationError("INVALID_EMAIL", HttpStatusCode.BAD_REQUEST);
    }
  }

  private get repository() {
    return new UserRepository();
  }

  private get passwordService() {
    return new UserPasswordService();
  }
}
