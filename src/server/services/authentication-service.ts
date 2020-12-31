import bcrypt from "bcrypt";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { DateTime } from "luxon";
import { IUser } from "../../node/database/entities/user";
import { UserPasswordRepository } from "../../node/database/repositories/user-password-repository";
import { UserRepository } from "../../node/database/repositories/user-repository";
import { environment } from "../../node/environment";
import { HttpStatusCode } from "../common/http-status-code";
import { OperationError } from "../common/operation-error";

export interface ILoginRequest {
  readonly email: string;
  readonly password: string;
}

export interface IAccessToken {
  readonly value: string;
  readonly expires: Date;
  readonly user: IUser;
}

export class AuthenticationService {
  public async login(request: ILoginRequest) {
    const user = await new UserRepository().findOne({
      where: {
        email: request.email,
      },
    });
    if (!user) {
      throw this.loginError();
    }

    const hashedPassword = await new UserPasswordRepository().findOne({
      where: {
        user_id: user.id,
      },
    });
    if (!hashedPassword) {
      throw this.loginError();
    }

    if (!bcrypt.compareSync(request.password, hashedPassword.hash)) {
      throw this.loginError();
    }

    return this.getUserAccessToken(user);
  }

  public async getIdentity(token: string) {
    const userId = await this.getTokenizedUserId(token);

    const user = await new UserRepository().findOne({ where: { id: userId } });
    if (!user) {
      throw new OperationError("INVALID_TOKEN", HttpStatusCode.UNAUTHORIZED);
    }

    return user;
  }

  /**
   * WARNING: Only use if the user has done something to prove their identity
   */
  public async getUserAccessToken(user: IUser): Promise<IAccessToken> {
    const { JWT_SECRET } = environment();
    const expiration = DateTime.utc().plus({
      days: 1,
    });
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: Math.floor(
        expiration.diff(DateTime.utc(), "seconds").toObject().seconds!
      ),
    });

    return {
      value: token,
      expires: expiration.toJSDate(),
      user,
    };
  }

  private async getTokenizedUserId(token: string) {
    const { JWT_SECRET } = environment();

    return new Promise<number>((resolve, reject) => {
      jwt.verify(
        token,
        JWT_SECRET,
        (err: VerifyErrors | null, decoded: unknown | undefined): void => {
          if (err) {
            return reject(err);
          }

          return resolve((decoded as { id: number }).id);
        }
      );
    });
  }

  private loginError() {
    return new OperationError(
      "INVALID_EMAIL_OR_PASSWORD",
      HttpStatusCode.UNAUTHORIZED
    );
  }
}
