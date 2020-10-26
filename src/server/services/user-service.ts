import { IUser } from "../../node/database/entities/user";
import { PostgresError } from "../../node/database/postgres/postgres-error";
import { PostgresErrorCode } from "../../node/database/postgres/postgres-error-codes";
import { HttpStatusCode } from "../common/http-status-code";
import { OperationError } from "../common/operation-error";
import { isValidEmail } from "../../common/validation/is-valid-email";
import { UserRepository } from "../../node/database/repositories/user-repository";

export interface ICreateUserRequest {
  email: string;
  name: string;
  address?: string;
}

export interface IUpdateUserRequest {
  email: string;
  name: string;
  address?: string;
}

interface IGetUserParams {
  page?: number;
  pageSize?: number;
}

export class UserService {
  public async getUserById(id: number): Promise<IUser> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new OperationError("NOT_FOUND", HttpStatusCode.NOT_FOUND);
    }

    return user;
  }

  public async getUsers({
    page,
    pageSize,
  }: IGetUserParams): Promise<Array<IUser>> {
    const take = pageSize;
    const skip = take && page && (page - 1) * take;

    return await this.repository.find({
      take,
      skip,
      order: {
        id: "ASC",
      },
    });
  }

  public async createUser({ email, name, address }: ICreateUserRequest) {
    this.checkEmail(email);

    try {
      return await this.repository.create({
        email,
        name,
        address,
      });
    } catch (err) {
      this.checkForUniqueViolation(err);

      throw new OperationError(
        "UNKNOWN_ERROR",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    const user = await this.getUserById(userId);
    await this.repository.delete({
      id: user.id,
    });
  }

  public async updateUser(
    userId: number,
    { email, name, address }: IUpdateUserRequest
  ): Promise<IUser> {
    this.checkEmail(email);

    const user = await this.getUserById(userId);

    try {
      return await this.repository.update({
        ...user,
        email,
        name,
        address,
      });
    } catch (err) {
      this.checkForUniqueViolation(err);

      throw new OperationError(
        "UNKNOWN_ERROR",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  private checkForUniqueViolation(err: unknown) {
    const emailInUse =
      err instanceof PostgresError &&
      err.code === PostgresErrorCode.UNIQUE_VIOLATION;
    if (emailInUse) {
      throw new OperationError("EMAIL_IN_USE", HttpStatusCode.BAD_REQUEST);
    }
  }

  private checkEmail(email: string) {
    if (!isValidEmail(email)) {
      throw new OperationError("INVALID_EMAIL", HttpStatusCode.BAD_REQUEST);
    }
  }

  private get repository() {
    return new UserRepository();
  }
}
