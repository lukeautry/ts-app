import { IUser } from "../database/entities/user";
import { PostgresError } from "../database/postgres/postgres-error";
import { PostgresErrorCode } from "../database/postgres/postgres-error-codes";
import { UserRepository } from "../database/repositories/user-repository";
import { HttpStatusCode } from "../common/http-status-code";
import { OperationError } from "../common/operation-error";

export interface ICreateUserRequest {
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
    });
  }

  public async createUser({ email, name, address }: ICreateUserRequest) {
    try {
      return await this.repository.create({
        email,
        name,
        address,
      });
    } catch (err) {
      const emailInUse =
        err instanceof PostgresError &&
        err.code === PostgresErrorCode.UNIQUE_VIOLATION;
      if (emailInUse) {
        throw new OperationError("EMAIL_IN_USE", HttpStatusCode.BAD_REQUEST);
      }

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

  private get repository() {
    return new UserRepository();
  }
}
