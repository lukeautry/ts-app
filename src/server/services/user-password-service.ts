import { promisify } from "util";
import bcrypt from "bcrypt";
import { OperationError } from "../common/operation-error";
import { HttpStatusCode } from "../common/http-status-code";
import { UserPasswordRepository } from "../../node/database/repositories/user-password-repository";

interface ISetPasswordParams {
  userId: number;
  password: string;
}

export class UserPasswordService {
  public async setPassword({ userId, password }: ISetPasswordParams) {
    const userPassword = await this.repo.findOne({
      where: {
        user_id: userId,
      },
    });
    if (userPassword) {
      const withHash = {
        ...userPassword,
        hash: await this.hashPassword(password),
      };
      await this.repo.update(withHash);
    } else {
      await this.repo.create({
        user_id: userId,
        hash: await this.hashPassword(password),
      });
    }
  }

  public async isValidPassword(userId: number, password: string) {
    const existingUserPassword = await this.repo.findOne({
      where: { user_id: userId },
    });
    if (!existingUserPassword) {
      throw new OperationError("INVALID_PASSWORD", HttpStatusCode.BAD_REQUEST);
    }

    return this.comparePassword(existingUserPassword.hash, password);
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private comparePassword(hash: string, password: string) {
    return promisify(bcrypt.compare)(password, hash);
  }

  private get repo() {
    return new UserPasswordRepository();
  }
}
